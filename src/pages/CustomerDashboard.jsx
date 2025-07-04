import React, { useState, useEffect } from 'react';

export default function CustomerDashboard() {
  const [data, setData] = useState([]);
  const cid = sessionStorage.getItem("customer_id");

  useEffect(() => {
    fetch(\`\${import.meta.env.VITE_API_BASE_URL}/customer_data/\${cid}\`)
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Your Cargo</h2>
      <table border="1" cellPadding="6" style={{ margin: '0 auto' }}>
        <thead>
          <tr><th>Container</th><th>Goods</th></tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}><td>{row.container}</td><td>{row.goods}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}