import api from "../services/api";

export async function checkBackend() {
  const response = await api.get("/health");
  return response.data;
}