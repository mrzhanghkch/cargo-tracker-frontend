import React, { useState } from 'react';
import { login } from './api';

export default function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);

  const handleLogin = async () => {
    try {
      const data = await login(userId, password);
      setResponse(data);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>🚢 Cargo Tracker Login</h1>
      <input
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        style={{ margin: '0.5rem' }}
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ margin: '0.5rem' }}
      /><br />
      <button onClick={handleLogin}>Login</button>

      {response && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Welcome {response.user_id}</h2>
          <p>Role: {response.role}</p>
          {response.customer_id && <p>Customer ID: {response.customer_id}</p>}
        </div>
      )}
    </div>
  );
}
