import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/shipments`
        );
        setShipments(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        {loading ? (
          <div>Loading shipments...</div>
        ) : (
          <div className="shipments-list">
            <h2>Recent Shipments</h2>
            {shipments.map(shipment => (
              <div key={shipment._id} className="shipment-card">
                <p>Tracking Number: {shipment.trackingNumber}</p>
                <p>Origin: {shipment.origin}</p>
                <p>Destination: {shipment.destination}</p>
                <p>Status: {shipment.status}</p>
                <p>Scheduled Arrival: {new Date(shipment.scheduledArrival).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;