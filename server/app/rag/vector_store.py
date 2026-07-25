from chromadb import PersistentClient
from chromadb.api.models.Collection import Collection

from app.core.config import CHROMA_DIRECTORY, COLLECTION_NAME


class VectorStore:
    def __init__(self) -> None:
        self.client = PersistentClient(
            path=str(CHROMA_DIRECTORY)
        )

        self.collection: Collection = self.client.get_or_create_collection(
            name=COLLECTION_NAME
        )

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


vector_store = VectorStore()