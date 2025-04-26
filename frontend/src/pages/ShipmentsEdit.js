import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ShipmentsEdit() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('Pending');
  const [carrier, setCarrier] = useState('');
  const [items, setItems] = useState([{ productId: '', quantity: '' }]);
  const [scheduledDeparture, setScheduledDeparture] = useState('');
  const [scheduledArrival, setScheduledArrival] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/shipments/${id}`
        );
        setShipment(response.data);
        setTrackingNumber(response.data.trackingNumber);
        setOrigin(response.data.origin);
        setDestination(response.data.destination);
        setStatus(response.data.status);
        setCarrier(response.data.carrier || '');
        setItems(response.data.items || [{ productId: '', quantity: '' }]);
        setScheduledDeparture(response.data.scheduledDeparture);
        setScheduledArrival(response.data.scheduledArrival);
      } catch (err) {
        console.error(err);
        setMessage('Error loading shipment data');
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/shipments/${id}`,
        {
          trackingNumber,
          origin,
          destination,
          status,
          carrier,
          items,
          scheduledDeparture,
          scheduledArrival
        }
      );
      
      setMessage('Shipment updated successfully!');
      setTimeout(() => {
        navigate('/shipments');
      }, 2000);
    } catch (err) {
      setMessage(err.response.data.message || 'Error updating shipment');
    }
  };

  const addItem = () => {
    setItems([...items, { productId: '', quantity: '' }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  if (loading) {
    return <div>Loading shipment data...</div>;
  }

  return (
    <div className="shipments-edit">
      <h1>Edit Shipment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tracking Number</label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Origin</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Carrier</label>
          <input
            type="text"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Scheduled Departure</label>
          <input
            type="datetime-local"
            value={scheduledDeparture}
            onChange={(e) => setScheduledDeparture(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Scheduled Arrival</label>
          <input
            type="datetime-local"
            value={scheduledArrival}
            onChange={(e) => setScheduledArrival(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Items</label>
          {items.map((item, index) => (
            <div key={index} className="item-row">
              <input
                type="text"
                placeholder="Product ID"
                value={item.productId}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].productId = e.target.value;
                  setItems(newItems);
                }}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].quantity = e.target.value;
                  setItems(newItems);
                }}
              />
              {index > 0 && (
                <button type="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addItem}>
            Add Item
          </button>
        </div>
        <button type="submit" className="btn">
          Update Shipment
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ShipmentsEdit;