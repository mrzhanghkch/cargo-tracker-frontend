import React,{useState,useEffect}from 'react';
export default function CustomerDashboard(){
  const [data,setData]=useState([]),cid=sessionStorage.getItem('cid');
  useEffect(()=>{fetch(`${import.meta.env.VITE_API_BASE_URL}/customer_data/${cid}`)
    .then(r=>r.json()).then(setData);},[]);
  return(<div style={{padding:'2rem',textAlign:'center'}}>
    <h2>Your Cargo</h2>
    <table style={{margin:'auto',borderCollapse:'collapse'}} border="1">
      <thead><tr><th>Container</th><th>Goods</th></tr></thead>
      <tbody>{data.map((r,i)=><tr key={i}><td>{r.container}</td><td>{r.goods}</td></tr>)}</tbody>
    </table>
  </div>);
}