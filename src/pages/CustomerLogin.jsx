import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerLogin() {
  const [form, setForm] = useState({ user_id: '', password: '' });
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch(\`\${import.meta.env.VITE_API_BASE_URL}/login\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.role === "customer") {
      sessionStorage.setItem("customer_id", data.customer_id);
      navigate("/customer");
    } else {
      alert("Access denied");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Customer Login</h2>
      <input placeholder="Customer Name" onChange={e => setForm({...form, user_id: e.target.value})} /><br/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} /><br/>
      <button onClick={login}>Login</button>
    </div>
  );
}