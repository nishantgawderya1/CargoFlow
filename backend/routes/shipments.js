const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');
const auth = require('../middleware/auth');
const validateShipment = (req, res, next) => {
  const { trackingNumber, origin, destination, items } = req.body;
  
  if (!trackingNumber) {
    return res.status(400).json({ message: 'Tracking number is required' });
  }
  
  if (!origin) {
    return res.status(400).json({ message: 'Origin is required' });
  }
  
  if (!destination) {
    return res.status(400).json({ message: 'Destination is required' });
  }
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'At least one item is required' });
  }
  
  items.forEach(item => {
    if (!item.productId) {
      return res.status(400).json({ message: 'Product ID is required for all items' });
    }
    
    if (!item.quantity || isNaN(item.quantity)) {
      return res.status(400).json({ message: 'Quantity is required and must be a number for all items' });
    }
  });
  
  next();
};

// Get all shipments
router.get('/', auth, async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single shipment by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new shipment
router.post('/', auth, validateShipment, async (req, res) => {
  const shipment = new Shipment({
    trackingNumber: req.body.trackingNumber,
    origin: req.body.origin,
    destination: req.body.destination,
    status: req.body.status,
    carrier: req.body.carrier,
    items: req.body.items,
    scheduledDeparture: req.body.scheduledDeparture,
    scheduledArrival: req.body.scheduledArrival
  });

  try {
    const newShipment = await shipment.save();
    res.status(201).json(newShipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a shipment
router.put('/:id', auth, validateShipment, async (req, res) => {
  try {
    const updatedShipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { 
        $set: {
          trackingNumber: req.body.trackingNumber,
          origin: req.body.origin,
          destination: req.body.destination,
          status: req.body.status,
          carrier: req.body.carrier,
          items: req.body.items,
          scheduledDeparture: req.body.scheduledDeparture,
          scheduledArrival: req.body.scheduledArrival,
          updatedAt: new Date()
        }
      },
      { new: true }
    );
    res.json(updatedShipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a shipment
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedShipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!deletedShipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json({ message: 'Shipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// In Backend/routes/shipments.js
// Get shipments with filtering
router.get('/', auth, async (req, res) => {
  try {
    const query = {};
    
    if (req.query.trackingNumber) {
      query.trackingNumber = { $regex: req.query.trackingNumber, $options: 'i' };
    }
    
    if (req.query.origin) {
      query.origin = { $regex: req.query.origin, $options: 'i' };
    }
    
    if (req.query.destination) {
      query.destination = { $regex: req.query.destination, $options: 'i' };
    }
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.fromDate) {
      query.scheduledDeparture = { $gte: new Date(req.query.fromDate) };
    }
    
    if (req.query.toDate) {
      query.scheduledArrival = { $lte: new Date(req.query.toDate) };
    }

    const shipments = await Shipment.find(query);
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});