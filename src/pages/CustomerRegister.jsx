import React,{useState}from 'react';
export default function CustomerRegister(){
  const [f,setF]=useState({name:'',password:''}),[msg,setMsg]=useState('');
  const reg=async()=>{
    const r=await fetch(`${import.meta.env.VITE_API_BASE_URL}/register_customer`,{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)
    });
    const d=await r.json(); setMsg(d.message||'Registered');
  };
  return(<div style={{padding:'2rem',textAlign:'center'}}>
    <h2>Customer Register</h2>
    <input placeholder="Name" onChange={e=>setF({...f,name:e.target.value})}/><br/>
    <input type="password" placeholder="Password" onChange={e=>setF({...f,password:e.target.value})}/><br/>
    <button onClick={reg}>Register</button><p>{msg}</p>
  </div>);
}