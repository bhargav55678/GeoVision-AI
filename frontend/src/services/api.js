import { API_BASE_URL } from "../config";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return await response.json();
}