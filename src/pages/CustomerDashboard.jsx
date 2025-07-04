import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
  const [data, setData] = useState([]);
  const cid = sessionStorage.getItem('cid');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/customer_data/${cid}`)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, [cid]);

  return (
    <div className="container">
      <h2>Your Cargo</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
        <thead>
          <tr>
            <th>Container</th>
            <th>Goods</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.container}</td>
              <td>{row.goods}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/"><button>Logout</button></Link>
    </div>
);
}
