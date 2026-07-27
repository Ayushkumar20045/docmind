import BASE_URL from "./client";

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  question: string;
  answer: string;
}

export async function askQuestion(
  question: string
): Promise<ChatResponse> {
  const response = await fetch(`${BASE_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response.");
  }

  return response.json() as Promise<ChatResponse>;
}