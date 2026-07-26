import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()


class LLMService:
    """
    Generic Language Model service.

    Currently powered by Groq.
    The rest of the application doesn't know or care
    which provider is being used.
    """

    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError("GROQ_API_KEY not found.")

        self.model_name = os.getenv(
            "MODEL_NAME",
            "llama-3.3-70b-versatile",
        )

        self.client = Groq(api_key=api_key)

    def generate(self, prompt: str) -> str:
        """
        Generate a response from the language model.
        """

        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.3,
        )

        return response.choices[0].message.content.strip()


llm_service = LLMService()