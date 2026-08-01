export interface UploadedDocument {
  id: number;
  filename: string;
  file_size: number;
  uploaded_at: string;
}

export interface UploadResponse {
  chat_id: number;
  document_id: number;
  filename: string;
  file_size: number;
  pages: number;
  characters: number;
  chunks: number;
  message: string;
}