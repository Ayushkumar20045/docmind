from app.rag.llm import llm_service
from app.rag.prompt_builder import PromptBuilder
from app.rag.retriever import retriever


class ChatService:
    """
    Handles the complete chat workflow:
    Question -> Retrieval -> Prompt -> LLM -> Answer
    """

    def answer_question(self, question: str) -> str:
        context_chunks = retriever.retrieve(question)

        prompt = PromptBuilder.build_prompt(
            question=question,
            context_chunks=context_chunks,
        )

        answer = llm_service.generate(prompt)

        return answer


chat_service = ChatService()