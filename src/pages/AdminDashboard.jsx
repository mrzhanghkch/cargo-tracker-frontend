import React, { useState } from 'react';

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [manual, setManual] = useState({ container: '', goods: '', customer: '' });
  const [status, setStatus] = useState('');
  const [customers, setCustomers] = useState([]);

  React.useEffect(() => {
    fetch(\`\${import.meta.env.VITE_API_BASE_URL}/customers\`)
      .then(res => res.json())
      .then(setCustomers);
  }, []);

  const uploadExcel = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(\`\${import.meta.env.VITE_API_BASE_URL}/upload_excel\`, {
      method: "POST", body: formData
    });
    const data = await res.json();
    setStatus(\`Uploaded: \${data.records} records\`);
  };

  const uploadManual = async () => {
    const res = await fetch(\`\${import.meta.env.VITE_API_BASE_URL}/upload_manual\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(manual)
    });
    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>📤 Admin Dashboard</h2>
      <h4>Upload Excel</h4>
      <input type="file" onChange={e => setFile(e.target.files[0])} /><br/>
      <button onClick={uploadExcel}>Upload</button>

      <h4>Or Enter Manually</h4>
      <input placeholder="Container" onChange={e => setManual({...manual, container: e.target.value})} /><br/>
      <input placeholder="Goods" onChange={e => setManual({...manual, goods: e.target.value})} /><br/>
      <select onChange={e => setManual({...manual, customer: e.target.value})}>
        <option value="">Select Customer</option>
        {customers.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select><br/>
      <button onClick={uploadManual}>Add Record</button>

      <p style={{ marginTop: '1rem' }}>{status}</p>
    </div>
  );
}