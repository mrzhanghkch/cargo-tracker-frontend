
import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, password })
    });
    const data = await res.json();
    if (data.role === 'admin') {
      onLoginSuccess();
    } else {
      alert('Access denied');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="User ID" value={user_id} onChange={(e) => setUserId(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
