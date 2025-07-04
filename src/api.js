const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(user_id, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}
