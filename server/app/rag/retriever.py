from app.rag.embedding_service import embedding_service
from app.rag.vector_store import vector_store


class Retriever:
    def retrieve(
        self,
        query: str,
        source: str,
        top_k: int = 5,
    ) -> list[str]:
        query_embedding = (
            embedding_service.generate_query_embedding(
                query
            )
        )

        return vector_store.search(
            query_embedding=query_embedding,
            source=source,
            top_k=top_k,
        )


retriever = Retriever()