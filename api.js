const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(user_id, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, password }),
  });

  return await response.json();
}
