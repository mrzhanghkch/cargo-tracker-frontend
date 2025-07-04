import React,{useState,useEffect}from 'react';
export default function AdminDashboard(){
  const [file,setFile]=useState(null), [manual,setManual]=useState({container:'',goods:'',customer:''});
  const [status,setStatus]=useState(''),[customers,setCustomers]=useState([]);
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_BASE_URL}/customers`)
      .then(r=>r.json()).then(d=>setCustomers(d));
  },[]);
  const uploadExcel=async()=>{ if(!file){ setStatus('Select file'); return;}
    const fd=new FormData(); fd.append('file',file);
    const r=await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload_excel`,{method:'POST',body:fd});
    const d=await r.json(); setStatus(`Uploaded ${d.records||0}`);
  };
  const uploadManual=async()=>{
    const r=await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload_manual`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify(manual)
    });
    const d=await r.json(); setStatus(d.message||'Done');
  };
  return (<div style={{padding:'2rem',maxWidth:'500px',margin:'auto'}}>
    <h2>Admin Dashboard</h2>
    <h4>Upload Excel</h4>
    <input type="file" onChange={e=>setFile(e.target.files[0])}/><button onClick={uploadExcel}>Upload</button>
    <h4>Manual Entry</h4>
    <input placeholder="Container" value={manual.container} onChange={e=>setManual({...manual,container:e.target.value})}/><br/>
    <input placeholder="Goods" value={manual.goods} onChange={e=>setManual({...manual,goods:e.target.value})}/><br/>
    <select value={manual.customer} onChange={e=>setManual({...manual,customer:e.target.value})}>
      <option value="">Select Customer</option>
      {customers.map((c,i)=><option key={i} value={c}>{c}</option>)}
    </select><button onClick={uploadManual}>Add</button>
    <p style={{color:'green'}}>{status}</p>
  </div>);
}