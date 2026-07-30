from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from app.api.routes.auth import router as auth_router
from app.api.routes.chat import router as chat_router
from app.api.routes.documents import router as document_router
from app.core.database import Base, engine
from app.core.rate_limiter import limiter
from app.models.document import Document
from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DocMind API",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)

app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(document_router)
app.include_router(chat_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "Welcome to DocMind API"}


@app.get("/health")
def health():
    return {"status": "healthy"}