import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [manual, setManual] = useState({ container: '', goods: '', customer: '' });
  const [status, setStatus] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/customers`)
      .then(res => res.json())
      .then(data => setCustomers(data.customers || []))
      .catch(() => setCustomers([]));
  }, []);

  const uploadExcel = async () => {
    if (!file) { setStatus('Select file first'); return; }
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload_excel`, { method: 'POST', body: fd });
      const data = await res.json();
      setStatus(`Uploaded: ${data.records || 0} records`);
    } catch {
      setStatus('Upload failed');
    }
  };

  const uploadManual = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload_manual`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manual)
      });
      const data = await res.json();
      setStatus(data.message || 'Manual upload done');
    } catch {
      setStatus('Manual upload failed');
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <section>
        <h4>Upload Excel</h4>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={uploadExcel}>Upload</button>
      </section>
      <section>
        <h4>Or Manual Entry</h4>
        <input placeholder="Container" value={manual.container} onChange={e => setManual({ ...manual, container: e.target.value })} />
        <input placeholder="Goods" value={manual.goods} onChange={e => setManual({ ...manual, goods: e.target.value })} />
        <select value={manual.customer} onChange={e => setManual({ ...manual, customer: e.target.value })}>
          <option value="">Select Customer</option>
          {customers.map((c,i)=><option key={i} value={c}>{c}</option>)}
        </select>
        <button onClick={uploadManual}>Add Record</button>
      </section>
      {status && <p style={{color:'green'}}>{status}</p>}
      <Link to="/"><button>Logout</button></Link>
    </div>
);
}
