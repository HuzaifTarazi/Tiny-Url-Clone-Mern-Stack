import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: `${API_URL}/api/urls`,
});

export async function fetchUrls() {
  const response = await api.get("/");
  return response.data;
}

export async function shortenUrl(originalUrl) {
  const response = await api.post(`/shorten`, { originalUrl });
  return response.data;
}

export async function deleteUrl(id) {
  await api.delete(`/${id}`);
}

export function getShortLink(shortCode) {
  return `${API_URL}/${shortCode}`;
}
