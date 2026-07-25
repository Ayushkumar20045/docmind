from sentence_transformers import SentenceTransformer

from app.core.config import EMBEDDING_MODEL


class EmbeddingService:
    def __init__(self) -> None:
        self.model = SentenceTransformer(
            EMBEDDING_MODEL
        )

    def generate_embeddings(
        self,
        chunks: list[str],
    ) -> list[list[float]]:
        return self.model.encode(
            chunks,
            convert_to_numpy=True,
            normalize_embeddings=True,
        ).tolist()


embedding_service = EmbeddingService()