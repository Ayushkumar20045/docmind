from typing import List

from fastapi import APIRouter, Depends, File, Request, UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.rate_limiter import limiter
from app.models.user import User
from app.schemas.document import (
    DocumentResponse,
    DocumentUploadResponse,
)
from app.services.document_service import (
    delete_document,
    get_documents,
    upload_document,
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "/upload",
    response_model=DocumentUploadResponse,
)
@limiter.limit("5/minute")
async def upload_document_route(
    request: Request,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return upload_document(
        file=file,
        db=db,
        current_user=current_user,
    )


@router.get(
    "",
    response_model=List[DocumentResponse],
)
async def get_documents_route(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_documents(
        db=db,
        current_user=current_user,
    )


@router.delete(
    "/{document_id}",
)
async def delete_document_route(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return delete_document(
        document_id=document_id,
        db=db,
        current_user=current_user,
    )