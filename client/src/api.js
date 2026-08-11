import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
// All API calls go through this file — keeps components simple
const api = axios.create({
  baseURL: `${API_URL}/api/urls`,
});

// Get every shortened URL from the database
export async function fetchUrls() {
  const response = await api.get("/");
  return response.data;
}

// Send a long URL and get back a short link
export async function shortenUrl(originalUrl) {
  const response = await api.post(`/shorten`, { originalUrl });
  return response.data;
}

// Remove a URL from the list
export async function deleteUrl(id) {
  await api.delete(`/${id}`);
}

// Build the full short link the user can copy
export function getShortLink(shortCode) {
  return `${shortCode}`;
}
