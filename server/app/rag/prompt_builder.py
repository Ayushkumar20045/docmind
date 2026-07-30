from typing import List


class PromptBuilder:
    """
    Builds structured prompts for the language model using
    the retrieved document context and the user's question.
    """

    SYSTEM_INSTRUCTIONS = """
You are DocMind, an AI assistant that answers questions using only the provided document context.

Rules:
1. Answer only from the supplied document context.
2. Never use outside knowledge.
3. If the answer cannot be found in the document context, reply exactly:
   "I couldn't find this information in the uploaded document."
4. Do not guess or make up facts.
5. Keep responses concise, accurate, and well-structured.
6. Use bullet points whenever they improve readability.
7. If the question is ambiguous, explain what information is missing instead of assuming.
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