import React, { useState } from 'react';

export default function ExcelUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload_excel`, {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    if (res.ok) {
      setStatus(`✅ Uploaded: ${result.records} records`);
    } else {
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>📤 Upload Excel File</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} /><br /><br />
      <button onClick={handleUpload}>Upload</button>
      <p style={{ marginTop: '1rem' }}>{status}</p>
    </div>
  );
}