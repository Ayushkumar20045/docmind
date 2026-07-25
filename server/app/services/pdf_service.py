from pathlib import Path
import json
import shutil

from fastapi import UploadFile
from pypdf import PdfReader

from app.core.config import PROCESSED_DIRECTORY, UPLOAD_DIRECTORY
from app.rag.embedding_service import embedding_service
from app.rag.splitter import split_text
from app.rag.vector_store import vector_store


def save_pdf(file: UploadFile):
    file_path = UPLOAD_DIRECTORY / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    reader = PdfReader(file_path)

    document_text = ""

    for page in reader.pages:
        text = page.extract_text()

        if text:
            document_text += text + "\n"

    text_file = PROCESSED_DIRECTORY / f"{file_path.stem}.txt"

    text_file.write_text(
        document_text,
        encoding="utf-8",
    )

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

    embeddings = embedding_service.generate_embeddings(chunk_texts)

    vector_store.add_documents(
        chunks=chunk_texts,
        embeddings=embeddings,
        source=file_path.stem,
    )

    return {
        "filename": file.filename,
        "file_size": file_path.stat().st_size,
        "pages": len(reader.pages),
        "characters": len(document_text),
        "chunks": len(chunk_texts),
        "message": "Document uploaded successfully",
    }