from sqlalchemy.orm import Session

from app.models.document import Document


class DocumentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        filename: str,
        file_path: str,
        file_size: int,
        user_id: int,
    ) -> Document:
        document = Document(
            filename=filename,
            file_path=file_path,
            file_size=file_size,
            user_id=user_id,
        )

        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)

        return document

    def get_by_id(
        self,
        document_id: int,
    ) -> Document | None:
        return (
            self.db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    def get_by_user(
        self,
        user_id: int,
    ) -> list[Document]:
        return (
            self.db.query(Document)
            .filter(Document.user_id == user_id)
            .order_by(Document.uploaded_at.desc())
            .all()
        )

    def delete(
        self,
        document: Document,
    ) -> None:
        self.db.delete(document)
        self.db.commit()