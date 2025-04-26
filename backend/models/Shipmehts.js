const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Transit', 'Delivered', 'Delayed'],
    default: 'Pending'
  },
  carrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrier'
  },
  items: [{
    productId: String,
    quantity: Number
  }],
  scheduledDeparture: Date,
  scheduledArrival: Date,
  actualDeparture: Date,
  actualArrival: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

module.exports = mongoose.model('Shipment', shipmentSchema);