const API_BASE_URL = "https://swasthsarthi-ai-2.onrender.com";

export async function searchSchemes(query) {
  const response = await fetch(
    `${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}