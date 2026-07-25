from app.rag.retriever import retriever


class ChatService:
    def get_context(
        self,
        question: str,
    ) -> str:
        chunks = retriever.retrieve(question)

        if not chunks:
            return ""

        return "\n\n".join(chunks)


chat_service = ChatService()