import React from 'react';

export default function LoginForm() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>🚢 Cargo Tracker Login</h1>
      <input type="text" placeholder="User ID" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <button>Login</button>
    </div>
  );
}