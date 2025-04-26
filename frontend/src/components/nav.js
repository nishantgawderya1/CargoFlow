import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/shipments">All Shipments</Link></li>
        <li><Link to="/carriers">Carriers</Link></li>
        <li><Link to="/warehouses">Warehouses</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;