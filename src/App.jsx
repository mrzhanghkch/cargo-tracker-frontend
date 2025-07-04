
import React, { useState } from 'react';
import Login from './components/Login';
import ExcelUpload from './components/ExcelUpload';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', padding: '2rem' }}>
      <h1>🚢 Cargo Tracker</h1>
      {!isAdmin ? <Login onLoginSuccess={() => setIsAdmin(true)} /> : <ExcelUpload />}
    </div>
  );
}

export default App;
