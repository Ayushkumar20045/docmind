from chromadb import PersistentClient
from chromadb.api.models.Collection import Collection

from app.core.config import CHROMA_DIRECTORY, COLLECTION_NAME


class VectorStore:
    def __init__(self) -> None:
        self.client = PersistentClient(
            path=str(CHROMA_DIRECTORY)
        )

        self.collection = self._create_collection()

    def _create_collection(self) -> Collection:
        return self.client.get_or_create_collection(
            name=COLLECTION_NAME
        )

    def reset_collection(self) -> None:
        try:
            self.client.delete_collection(
                name=COLLECTION_NAME
            )
        except Exception:
            pass

        self.collection = self._create_collection()

    def add_documents(
        self,
        chunks: list[str],
        embeddings: list[list[float]],
        source: str,
    ) -> None:
        ids = [
            f"{source}_{index}"
            for index in range(len(chunks))
        ]

        metadatas = [
            {
                "source": source,
                "chunk": index,
            }
            for index in range(len(chunks))
        ]

        self.collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadatas,
        )

    def delete_document(
        self,
        source: str,
    ) -> None:
        self.collection.delete(
            where={
                "source": source,
            }
        )

    def search(
        self,
        query_embedding: list[float],
        source: str,
        top_k: int = 5,
    ) -> list[str]:
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where={
                "source": source,
            },
        )

        documents = results.get(
            "documents",
            [],
        )

        if not documents:
            return []

        return documents[0]


vector_store = VectorStore()