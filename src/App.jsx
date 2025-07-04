import React, { useState } from 'react';

export default function App() {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id, password })
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.role === "admin") {
        setRole("admin");
        setMessage("✅ Welcome Admin");
      } else if (data.role === "customer") {
        setRole("customer");
        setMessage(`✅ Welcome Customer ${data.customer_id}`);
      } else {
        setMessage("❌ Access denied");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "Arial" }}>
      <h1>🚢 Cargo Tracker Login</h1>

      <input
        type="text"
        placeholder="User ID"
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>

      <div style={{ marginTop: "1rem", color: role === 'admin' || role === 'customer' ? 'green' : 'red' }}>
        {message}
      </div>
    </div>
  );
}