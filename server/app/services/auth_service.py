from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import Token, UserRegister


def register_user(
    user: UserRegister,
    db: Session,
) -> User:
    user_repository = UserRepository(db)

    existing_user = user_repository.get_by_email(user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    return user_repository.create(user)


def login_user(
    email: str,
    password: str,
    db: Session,
) -> Token:
    user_repository = UserRepository(db)

    existing_user = user_repository.get_by_email(email)

    if existing_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not verify_password(
        password,
        existing_user.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(
        {
            "sub": existing_user.email,
            "user_id": existing_user.id,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }