import { apiFetch } from "../api";

export async function getHealth() {
  const response = await apiFetch("/health");
  return await response.json();
}