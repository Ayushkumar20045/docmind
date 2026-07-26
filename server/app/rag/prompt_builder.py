from typing import List


class PromptBuilder:
    """
    Builds structured prompts for the language model using
    the retrieved document context and the user's question.
    """

    SYSTEM_INSTRUCTIONS = """
You are DocMind, an AI assistant that answers questions using only the provided document context.

Rules:
1. Answer only from the supplied context.
2. If the answer is not present in the context, clearly say:
   "I couldn't find this information in the uploaded document."
3. Do not make up facts.
4. Keep responses accurate, concise, and well-structured.
5. Use bullet points when appropriate.
""".strip()

    @classmethod
    def build_prompt(
        cls,
        question: str,
        context_chunks: List[str],
    ) -> str:
        """
        Construct the final prompt sent to the language model.
        """

        context = "\n\n".join(context_chunks)

        prompt = f"""
{cls.SYSTEM_INSTRUCTIONS}

========================
DOCUMENT CONTEXT
========================

{context}

========================
USER QUESTION
========================

{question}

========================
ANSWER
========================
""".strip()

        return prompt