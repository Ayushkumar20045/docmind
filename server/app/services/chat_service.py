from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.document_repository import DocumentRepository
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
                detail="You are not authorized to access this document.",
            )

        context_chunks = retriever.retrieve(
            query=question,
            source=document.file_path.rsplit("/", 1)[-1].rsplit(".", 1)[0],
        )

        prompt = PromptBuilder.build_prompt(
            question=question,
            context_chunks=context_chunks,
        )

        return llm_service.generate(prompt)


chat_service = ChatService()