from datetime import datetime

from pydantic import BaseModel


class DocumentUploadResponse(BaseModel):
    filename: str
    file_size: int
    pages: int
    characters: int
    chunks: int
    message: str


class DocumentResponse(BaseModel):
    id: int
    filename: str
    file_size: int
    uploaded_at: datetime

    class Config:
        from_attributes = True