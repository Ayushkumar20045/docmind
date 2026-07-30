from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.rate_limiter import limiter
from app.models.user import User
from app.schemas.user import (
    Token,
    UserRegister,
    UserResponse,
)
from app.services.auth_service import (
    login_user,
    register_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
@limiter.limit("5/minute")
def register(
    request: Request,
    user: UserRegister,
    db: Session = Depends(get_db),
):
    return register_user(
        user=user,
        db=db,
    )


@router.post(
    "/login",
    response_model=Token,
)
@limiter.limit("10/minute")
def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    return login_user(
        email=form_data.username,
        password=form_data.password,
        db=db,
    )


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user