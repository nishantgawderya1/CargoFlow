import React from 'react';
import ShipmentTracker from '../components/shipment-tracker';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to CargoFlow</h1>
      <ShipmentTracker />
    </div>
  );
}

export default Home;