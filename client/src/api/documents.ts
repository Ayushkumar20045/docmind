import BASE_URL from "./client";

export interface UploadResponse {
  filename: string;
  file_size: number;
  message: string;
}

export async function uploadDocument(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload document.");
  }

  return response.json() as Promise<UploadResponse>;
}