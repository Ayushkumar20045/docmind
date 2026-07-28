import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

UPLOAD_DIRECTORY = BASE_DIR / "uploads"
PROCESSED_DIRECTORY = BASE_DIR / "processed"
CHROMA_DIRECTORY = BASE_DIR / "chroma_db"

UPLOAD_DIRECTORY.mkdir(exist_ok=True)
PROCESSED_DIRECTORY.mkdir(exist_ok=True)
CHROMA_DIRECTORY.mkdir(exist_ok=True)

CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

COLLECTION_NAME = "docmind"


class Settings:
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg://ayushkumar@localhost:5432/docmind",
    )

    SECRET_KEY: str = os.getenv(
        "SECRET_KEY",
        "MUsDJjjyeJV4gdBwlHSbzEjUotBi5E8Bgkpv4Yd8k8Q",
    )

    ALGORITHM: str = os.getenv(
        "ALGORITHM",
        "HS256",
    )

    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "1440",
        )
    )


settings = Settings()