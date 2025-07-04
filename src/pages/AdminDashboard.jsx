import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [manual, setManual] = useState({ container: '', goods: '', customer: '' });
  const [status, setStatus] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/customers`)
      .then(res => res.json())
      .then(data => setCustomers(data.customers || []))  // defensive coding
      .catch(() => setCustomers([]));
  }, []);

  const uploadExcel = async () => {
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload_excel`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setStatus(`Uploaded: ${data.records || 0} records`);
    } catch (err) {
      setStatus('Upload failed.');
    }
  };

  const uploadManual = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload_manual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manual)
      });
      const data = await res.json();
      setStatus(data.message || 'Manual upload complete.');
    } catch (err) {
      setStatus('Manual upload failed.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h2>📤 Admin Dashboard</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h4>Upload Excel</h4>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <br />
        <button onClick={uploadExcel} style={{ marginTop: '0.5rem' }}>Upload</button>
      </section>

      <section>
        <h4>Or Enter Manually</h4>
        <input
          placeholder="Container"
          value={manual.container}
          onChange={e => setManual({ ...manual, container: e.target.value })}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <input
          placeholder="Goods"
          value={manual.goods}
          onChange={e => setManual({ ...manual, goods: e.target.value })}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <select
          value={manual.customer}
          onChange={e => setManual({ ...manual, customer: e.target.value })}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        >
          <option value="">Select Customer</option>
          {customers.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={uploadManual}>Add Record</button>
      </section>

      <p style={{ marginTop: '1rem', color: 'green' }}>{status}</p>
    </div>
  );
}
