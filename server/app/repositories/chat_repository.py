from sqlalchemy.orm import Session

from app.models.chat import Chat


class ChatRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        user_id: int,
        document_id: int,
    ) -> Chat:
        chat = Chat(
            user_id=user_id,
            document_id=document_id,
        )

        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)

        return chat

    def get_by_id(
        self,
        chat_id: int,
    ) -> Chat | None:
        return (
            self.db.query(Chat)
            .filter(Chat.id == chat_id)
            .first()
        )

    def get_by_document(
        self,
        document_id: int,
        user_id: int,
    ) -> Chat | None:
        return (
            self.db.query(Chat)
            .filter(
                Chat.document_id == document_id,
                Chat.user_id == user_id,
            )
            .first()
        )

    def get_by_user(
        self,
        user_id: int,
    ) -> list[Chat]:
        return (
            self.db.query(Chat)
            .filter(Chat.user_id == user_id)
            .order_by(Chat.updated_at.desc())
            .all()
        )

    def update_title(
        self,
        chat: Chat,
        title: str,
    ) -> Chat:
        chat.title = title

        self.db.commit()
        self.db.refresh(chat)

        return chat