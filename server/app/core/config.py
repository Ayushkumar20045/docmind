from pathlib import Path


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