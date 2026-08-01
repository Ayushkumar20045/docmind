from datetime import datetime

from pydantic import BaseModel

from app.schemas.message import MessageResponse


# ==========================
# Existing Chat API
# ==========================

class ChatRequest(BaseModel):
    document_id: int
    question: str


class ChatResponse(BaseModel):
    question: str
    answer: str


# ==========================
# Chat History API
# ==========================

class ChatDocument(BaseModel):
    id: int
    filename: str
    file_size: int

    class Config:
        from_attributes = True


class ChatCreateResponse(BaseModel):
    id: int
    title: str | None
    created_at: datetime
    document: ChatDocument

    class Config:
        from_attributes = True


class ChatHistoryResponse(BaseModel):
    id: int
    title: str | None
    created_at: datetime
    updated_at: datetime
    document: ChatDocument

    class Config:
        from_attributes = True


class ChatDetailResponse(BaseModel):
    id: int
    title: str | None
    created_at: datetime
    updated_at: datetime
    document: ChatDocument
    messages: list[MessageResponse]

    class Config:
        from_attributes = True