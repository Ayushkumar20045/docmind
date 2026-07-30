from pathlib import Path
import json
import shutil

from fastapi import UploadFile
from pypdf import PdfReader
from sqlalchemy.orm import Session

from app.core.config import PROCESSED_DIRECTORY, UPLOAD_DIRECTORY
from app.models.user import User
from app.rag.embedding_service import embedding_service
from app.rag.splitter import split_text
from app.rag.vector_store import vector_store
from app.repositories.document_repository import DocumentRepository


def save_pdf_file(file: UploadFile) -> Path:
    file_path = UPLOAD_DIRECTORY / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path


def extract_pdf_text(file_path: Path) -> tuple[str, int]:
    reader = PdfReader(file_path)

    document_text = ""

    for page in reader.pages:
        text = page.extract_text()

        if text:
            document_text += text + "\n"

    return document_text, len(reader.pages)


def save_processed_text(
    file_path: Path,
    document_text: str,
) -> None:
    text_file = PROCESSED_DIRECTORY / f"{file_path.stem}.txt"

    text_file.write_text(
        document_text,
        encoding="utf-8",
    )


def create_chunks(
    file_path: Path,
    document_text: str,
) -> list[str]:
    chunk_texts = split_text(document_text)

    chunk_file = PROCESSED_DIRECTORY / f"{file_path.stem}_chunks.json"

    chunk_file.write_text(
        json.dumps(
            [
                {
                    "chunk_id": index + 1,
                    "text": chunk,
                }
                for index, chunk in enumerate(chunk_texts)
            ],
            indent=4,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    return chunk_texts


def create_embeddings(
    file_path: Path,
    chunk_texts: list[str],
) -> None:
    embeddings = embedding_service.generate_embeddings(
        chunk_texts
    )

    vector_store.add_documents(
        chunks=chunk_texts,
        embeddings=embeddings,
        source=file_path.stem,
    )


def delete_document_files(
    file_path: str,
) -> None:
    pdf_file = Path(file_path)

    text_file = (
        PROCESSED_DIRECTORY /
        f"{pdf_file.stem}.txt"
    )

    chunk_file = (
        PROCESSED_DIRECTORY /
        f"{pdf_file.stem}_chunks.json"
    )

    for path in [
        pdf_file,
        text_file,
        chunk_file,
    ]:
        if path.exists():
            path.unlink()


def process_document(
    file: UploadFile,
    db: Session,
    current_user: User,
):
    file_path = save_pdf_file(file)

    document_text, pages = extract_pdf_text(file_path)

    save_processed_text(
        file_path=file_path,
        document_text=document_text,
    )

    chunk_texts = create_chunks(
        file_path=file_path,
        document_text=document_text,
    )

    create_embeddings(
        file_path=file_path,
        chunk_texts=chunk_texts,
    )

    document_repository = DocumentRepository(db)

    document = document_repository.create(
        filename=file.filename,
        file_path=str(file_path),
        file_size=file_path.stat().st_size,
        user_id=current_user.id,
    )

    return {
        "filename": document.filename,
        "file_size": document.file_size,
        "pages": pages,
        "characters": len(document_text),
        "chunks": len(chunk_texts),
        "message": "Document uploaded successfully",
    }