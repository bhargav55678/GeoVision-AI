const API_URL = "https://geovision-ai-f3h3.onrender.com";

export async function getHealth() {
  const response = await fetch(`${API_URL}/health`);
  return await response.json();
}