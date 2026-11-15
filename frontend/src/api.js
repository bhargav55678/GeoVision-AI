import { API_BASE_URL } from "./config";

// Backend Health
export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return await response.json();
}

// Compare Two Images
export async function compareImages(beforeImage, afterImage) {
  const formData = new FormData();

  formData.append("before", beforeImage);
  formData.append("after", afterImage);

  const response = await fetch(`${API_BASE_URL}/compare`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}