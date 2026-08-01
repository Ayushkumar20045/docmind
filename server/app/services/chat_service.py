from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.chat_repository import ChatRepository
from app.repositories.document_repository import DocumentRepository
from app.repositories.message_repository import MessageRepository
from app.rag.llm import llm_service
from app.rag.prompt_builder import PromptBuilder
from app.rag.retriever import retriever


class ChatService:
    def answer_question(
        self,
        document_id: int,
        question: str,
        db: Session,
        current_user: User,
    ) -> str:
        document_repository = DocumentRepository(db)
        chat_repository = ChatRepository(db)
        message_repository = MessageRepository(db)

        document = document_repository.get_by_id(
            document_id,
        )

        if document is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found.",
            )

        if document.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not authorized to access this document.",
            )

        chat = chat_repository.get_by_document(
            document_id=document.id,
            user_id=current_user.id,
        )

        if chat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found.",
            )

        message_repository.create(
            chat_id=chat.id,
            role="user",
            content=question,
        )

        context_chunks = retriever.retrieve(
            query=question,
            source=document.file_path.rsplit("/", 1)[-1].rsplit(".", 1)[0],
        )

        prompt = PromptBuilder.build_prompt(
            question=question,
            context_chunks=context_chunks,
        )

        answer = llm_service.generate(prompt)

        message_repository.create(
            chat_id=chat.id,
            role="assistant",
            content=answer,
        )

        if chat.title is None:
            title = (
                question[:60] + "..."
                if len(question) > 60
                else question
            )

            chat_repository.update_title(
                chat,
                title,
            )

        return answer

    def get_user_chats(
        self,
        db: Session,
        current_user: User,
    ):
        chat_repository = ChatRepository(db)

        return chat_repository.get_by_user(
            current_user.id,
        )

    def get_chat(
        self,
        chat_id: int,
        db: Session,
        current_user: User,
    ):
        chat_repository = ChatRepository(db)
        message_repository = MessageRepository(db)

        chat = chat_repository.get_by_id(
            chat_id,
        )

        if chat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found.",
            )

        if chat.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized.",
            )

        messages = message_repository.get_by_chat(
            chat.id,
        )

        return {
            "id": chat.id,
            "title": chat.title,
            "created_at": chat.created_at,
            "updated_at": chat.updated_at,
            "document": chat.document,
            "messages": messages,
        }


chat_service = ChatService()