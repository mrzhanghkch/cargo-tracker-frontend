import React, { useState } from 'react';

export default function CustomerRegister() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [msg, setMsg] = useState('');

  const register = async () => {
    const res = await fetch(\`\${import.meta.env.VITE_API_BASE_URL}/register_customer\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMsg(data.message || 'Registered');
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Register as Customer</h2>
      <input placeholder="Customer Name" onChange={e => setForm({...form, name: e.target.value})} /><br/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} /><br/>
      <button onClick={register}>Register</button>
      <p>{msg}</p>
    </div>
  );
}