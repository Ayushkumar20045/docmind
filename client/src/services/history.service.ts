import api from "../api/api";

export interface ChatDocument {
  id: number;
  filename: string;
  file_size: number;
}

export interface ChatHistory {
  id: number;
  title: string | null;
  created_at: string;
  updated_at: string;
  document: ChatDocument;
}

export async function getChats() {
  const response = await api.get<ChatHistory[]>("/chat/history");

  return response.data;
}

export async function getMessages(chatId: number) {
  const response = await api.get(
    `/chat/history/${chatId}/messages`
  );

  return response.data;
}