import api from "../api/api";
import type {
  UploadedDocument,
  UploadResponse,
} from "../types/document";

export async function uploadDocument(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/documents/upload", formData);

  return response.data;
}

export async function getDocuments(): Promise<UploadedDocument[]> {
  const response = await api.get("/documents");

  return response.data;
}