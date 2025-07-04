import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to Cargo Tracker</h1>
      <Link to="/admin/login"><button>Admin Login</button></Link>
      <Link to="/login"><button>Customer Login</button></Link>
      <Link to="/register"><button>Register as Customer</button></Link>
    </div>
  );
}
