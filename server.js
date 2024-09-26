const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const flightRoutes = require('./routes/flights');
const vendorRoutes = require('./routes/vendors');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/users', require('./routes/users'));

app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/flights', flightRoutes);
app.use('/api/vendors', vendorRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
