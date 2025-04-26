import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShipmentTracker() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!trackingNumber) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/shipments?trackingNumber=${trackingNumber}`);
      setShipment(response.data[0]);
    } catch (err) {
      setError('Shipment not found or error occurred');
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shipment-tracker">
      <h2>Track Your Shipment</h2>
      <div className="tracker-form">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number"
        />
        <button onClick={handleTrack} disabled={loading}>
          {loading ? 'Tracking...' : 'Track Shipment'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {shipment && (
        <div className="shipment-details">
          <h3>Shipment Details</h3>
          <p>Origin: {shipment.origin}</p>
          <p>Destination: {shipment.destination}</p>
          <p>Status: {shipment.status}</p>
          <p>Scheduled Arrival: {new Date(shipment.scheduledArrival).toLocaleDateString()}</p>
          {shipment.actualDeparture && (
            <p>Actual Departure: {new Date(shipment.actualDeparture).toLocaleDateString()}</p>
          )}
          {shipment.actualArrival && (
            <p>Actual Arrival: {new Date(shipment.actualArrival).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ShipmentTracker;