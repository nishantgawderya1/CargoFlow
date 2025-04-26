// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes will be added here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ... existing imports
const shipmentRoutes = require('./routes/shipments');

// ... after middleware setup
app.use('/api/shipments', shipmentRoutes);

// Add these requires at the top
const authRoutes = require('./routes/auth');
require('dotenv').config();

const shipmentRoutes = require('./routes/shipments');

app.use('/api/shipments', shipmentRoutes);

// Add these middleware and routes
app.use(express.json());
app.use('/api/auth', authRoutes);

// Add this to your environment variables (.env file)
JWT_SECRET=b7a12682d0019027659d3433bb8ca51e8fe52eb881aa96de181f5937d7b389487bc0baf7ed8dd8f46b1ad3536711fb3880642213ee6c917fdefb908c94f61bb3