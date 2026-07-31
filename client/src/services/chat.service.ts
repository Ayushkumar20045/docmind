import api from "../api/api";

export interface ChatResponse {
  question: string;
  answer: string;
}

export async function askQuestion(
  documentId: number,
  question: string
): Promise<ChatResponse> {
  const response = await api.post("/chat/", {
    document_id: documentId,
    question,
  });

  return response.data;
}