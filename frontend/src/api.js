import { API_BASE_URL } from "./config";

const TOKEN_KEY = "geovision_access_token";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredAuth(response) {
  localStorage.setItem(TOKEN_KEY, response.access_token);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch(path, options = {}, token = getStoredToken()) {
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearStoredToken();
    window.dispatchEvent(new Event("geovision:unauthorized"));
  }

  return response;
}

async function requestJson(path, options = {}, token) {
  const response = await apiFetch(path, options, token);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Request failed");
  }
  return data;
}

export function registerUser(details) {
  return requestJson("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

export function loginUser(credentials) {
  return requestJson("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export function getCurrentUser(token) {
  return requestJson("/auth/me", {}, token);
}

// Backend Health
export async function getHealth() {
  const response = await apiFetch("/health");
  return await response.json();
}

// Compare Two Images
export async function compareImages(beforeImage, afterImage) {
  const formData = new FormData();

  formData.append("before", beforeImage);
  formData.append("after", afterImage);

  const response = await apiFetch("/compare", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Comparison request failed");
  }

  return data;
}