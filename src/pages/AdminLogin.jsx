import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AdminLogin() {
  const [user, setUser] = useState(''), [pwd, setPwd] = useState('');
  const navigate = useNavigate();
  const login = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ user_id:user, password:pwd })
    });
    const data = await res.json();
    if(data.role==='admin') navigate('/admin/dashboard'); else alert('Denied');
  };
  return (<div style={{padding:'2rem',textAlign:'center'}}>
    <h2>Admin Login</h2>
    <input placeholder="User ID" onChange={e=>setUser(e.target.value)}/><br/>
    <input type="password" placeholder="Password" onChange={e=>setPwd(e.target.value)}/><br/>
    <button onClick={login}>Login</button>
  </div>);
}