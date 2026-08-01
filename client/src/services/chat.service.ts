import api from "../api/api";

export interface ChatResponse {
  question: string;
  answer: string;
}

export interface ChatDocument {
  id: number;
  filename: string;
  file_size: number;
}

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ChatHistory {
  id: number;
  title: string | null;
  created_at: string;
  updated_at: string;
  document: ChatDocument;
}

export interface ChatDetail extends ChatHistory {
  messages: Message[];
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

export async function getChats(): Promise<ChatHistory[]> {
  const response = await api.get("/chat/history");

  return response.data;
}

export async function getChat(
  chatId: number
): Promise<ChatDetail> {
  const response = await api.get(
    `/chat/history/${chatId}`
  );

  return response.data;
}