const DEFAULT_API_BASE_URL = "https://geovision-ai-f3h3.onrender.com";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export function getProtectedFilePath(filename) {
  const cleanPath = filename
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");
  return `/files/${cleanPath}`;
}

export function getPublicAssetUrl(filename) {
  return `${API_BASE_URL}/public-assets/${filename}`;
}
