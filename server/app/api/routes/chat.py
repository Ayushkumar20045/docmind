from typing import List

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.rate_limiter import limiter
from app.models.user import User
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ChatHistoryResponse,
)
from app.schemas.message import MessageResponse
from app.services.chat_service import chat_service

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "/",
    response_model=ChatResponse,
)
@limiter.limit("30/minute")
async def chat(
    request: Request,
    chat_request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    answer = chat_service.answer_question(
        document_id=chat_request.document_id,
        question=chat_request.question,
        db=db,
        current_user=current_user,
    )

    return ChatResponse(
        question=chat_request.question,
        answer=answer,
    )


@router.get(
    "/history",
    response_model=List[ChatHistoryResponse],
)
async def get_chats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return chat_service.get_user_chats(
        db,
        current_user,
    )


@router.get(
    "/history/{chat_id}",
    response_model=ChatHistoryResponse,
)
async def get_chat(
    chat_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return chat_service.get_chat(
        chat_id,
        db,
        current_user,
    )


@router.get(
    "/history/{chat_id}/messages",
    response_model=List[MessageResponse],
)
async def get_messages(
    chat_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return chat_service.get_messages(
        chat_id,
        db,
        current_user,
    )