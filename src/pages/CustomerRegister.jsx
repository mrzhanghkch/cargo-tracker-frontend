import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CustomerRegister() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [msg, setMsg] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register_customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMsg(data.message || 'Registered');
    } catch {
      setMsg('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Customer Registration</h2>
      <form onSubmit={register}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
      <Link to="/"><button>Back Home</button></Link>
    </div>
);
}
