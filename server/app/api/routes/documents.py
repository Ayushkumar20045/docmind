from fastapi import APIRouter, File, UploadFile

from app.schemas.document import DocumentUploadResponse
from app.services.pdf_service import save_pdf

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "/upload",
    response_model=DocumentUploadResponse,
)
async def upload_document(
    file: UploadFile = File(...),
):
    return save_pdf(file)