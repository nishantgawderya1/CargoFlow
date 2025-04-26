import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Shipments() {
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

  const deleteShipment = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/shipments/${id}`);
      setShipments(shipments.filter(shipment => shipment._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const [filters, setFilters] = useState({
    trackingNumber: '',
    origin: '',
    destination: '',
    status: '',
    fromDate: '',
    toDate: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams(filters).toString();
    history.push(`/shipments?${queryParams}`);
  };

  const clearFilters = () => {
    setFilters({
      trackingNumber: '',
      origin: '',
      destination: '',
      status: '',
      fromDate: '',
      toDate: ''
    });
    history.push('/shipments');
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        let url = `${process.env.REACT_APP_API_URL}/shipments`;
        const queryParams = new URLSearchParams(filters).toString();
        if (queryParams) {
          url += `?${queryParams}`;
        }
        
        const response = await axios.get(url);
        setShipments(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [filters]);



  return (
    <div className="shipments-page">
      <h1>All Shipments</h1>
      <div className="filters">
        <div className="form-group">
          <label>Tracking Number</label>
          <input
            type="text"
            name="trackingNumber"
            value={filters.trackingNumber}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <label>Origin</label>
          <input
            type="text"
            name="origin"
            value={filters.origin}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={filters.destination}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
        <div className="form-group">
          <label>From Date</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <label>To Date</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
          />
        </div>
        <button onClick={applyFilters} className="btn">
          Apply Filters
        </button>
        <button onClick={clearFilters} className="btn">
          Clear Filters
        </button>
      </div>
      
      {/* ... rest of the component */}
    </div>
  );
}

export default Shipments;