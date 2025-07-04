import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CustomerLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, password })
      });
      const data = await res.json();
      if (data.role === 'customer' && data.customer_id) {
        sessionStorage.setItem('cid', data.customer_id);
        navigate('/customer');
      } else {
        throw new Error('Access denied');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <Link to="/"><button>Back Home</button></Link>
    </div>
);
}
