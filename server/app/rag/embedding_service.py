import os

from google import genai
from google.genai import types


class EmbeddingService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")

        if not api_key:
            raise ValueError(
                "GOOGLE_API_KEY not found."
            )

        self.client = genai.Client(
            api_key=api_key
        )

        self.model = "gemini-embedding-001"

    def generate_embeddings(
        self,
        chunks: list[str],
    ) -> list[list[float]]:
        embeddings = []

        for chunk in chunks:
            response = self.client.models.embed_content(
                model=self.model,
                contents=chunk,
                config=types.EmbedContentConfig(
                    task_type="RETRIEVAL_DOCUMENT",
                ),
            )

            embeddings.append(
                response.embeddings[0].values
            )

        return embeddings

    def generate_query_embedding(
        self,
        query: str,
    ) -> list[float]:
        response = self.client.models.embed_content(
            model=self.model,
            contents=query,
            config=types.EmbedContentConfig(
                task_type="RETRIEVAL_QUERY",
            ),
        )

        return response.embeddings[0].values


embedding_service = EmbeddingService()