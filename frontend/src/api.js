const API_URL = "http://127.0.0.1:8000";

// Backend Health
export async function getHealth() {
  const response = await fetch(`${API_URL}/health`);
  return await response.json();
}

// Compare Two Images
export async function compareImages(beforeImage, afterImage) {
  const formData = new FormData();

  formData.append("before", beforeImage);
  formData.append("after", afterImage);

  const response = await fetch(`${API_URL}/compare`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}