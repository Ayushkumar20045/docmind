from pydantic import BaseModel


class DocumentUploadResponse(BaseModel):
    filename: str
    file_size: int
    pages: int
    characters: int
    chunks: int
    message: str