from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.chat_repository import ChatRepository
from app.repositories.document_repository import DocumentRepository
from app.rag.vector_store import vector_store
from app.services.pdf_service import (
    delete_document_files,
    process_document,
)


def upload_document(
    file,
    db: Session,
    current_user: User,
):
    document, pages, characters, chunks = process_document(
        file=file,
        db=db,
        current_user=current_user,
    )

    chat_repository = ChatRepository(db)

    chat = chat_repository.create(
        user_id=current_user.id,
        document_id=document.id,
    )

    return {
        "chat_id": chat.id,
        "document_id": document.id,
        "filename": document.filename,
        "file_size": document.file_size,
        "pages": pages,
        "characters": characters,
        "chunks": chunks,
        "message": "Document uploaded successfully",
    }


def get_documents(
    db: Session,
    current_user: User,
):
    document_repository = DocumentRepository(db)

    return document_repository.get_by_user(
        user_id=current_user.id,
    )


def delete_document(
    document_id: int,
    db: Session,
    current_user: User,
):
    document_repository = DocumentRepository(db)

    document = document_repository.get_by_id(
        document_id
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to delete this document.",
        )

    delete_document_files(
        file_path=document.file_path,
    )

    vector_store.delete_document(
        source=document.filename.rsplit(".", 1)[0],
    )

    document_repository.delete(document)

    return {
        "message": "Document deleted successfully.",
    }