export interface UploadedDocument {
  id: number;
  filename: string;
  file_size: number;
  uploaded_at: string;
}

export interface UploadResponse {
  filename: string;
  file_size: number;
  pages: number;
  characters: number;
  chunks: number;
  message: string;
}