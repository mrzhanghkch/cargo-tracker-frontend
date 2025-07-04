import React,{useState}from 'react';
import {useNavigate}from 'react-router-dom';
export default function CustomerLogin(){
  const [u,p]=useState(''),[ps,setPs]=useState('');
  const nav=useNavigate();
  const login=async()=>{
    const r=await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:u,password:ps})
    });
    const d=await r.json();
    if(d.role==='customer'){sessionStorage.setItem('cid',d.customer_id);nav('/customer');}
    else alert('Denied');
  };
  return(<div style={{padding:'2rem',textAlign:'center'}}>
    <h2>Customer Login</h2>
    <input placeholder="User ID" onChange={e=>u(e.target.value)}/><br/>
    <input type="password" placeholder="Password" onChange={e=>setPs(e.target.value)}/><br/>
    <button onClick={login}>Login</button>
  </div>);
}