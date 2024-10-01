const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const flightRoutes = require('./routes/flights');
const vendorRoutes = require('./routes/vendors');
const quotationRoutes = require('./routes/Quotations');
const userRouter = require('./routes/users');
const flightCarrierRoutes = require('./routes/flightCarrierRoutesmasters');
const attractionRoutes = require('./routes/attractions');
const hotelMasterRoutes = require('./routes/hotelMaster');
const cityRoutes = require('./routes/city');




const app = express();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/flights', flightRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/users', userRouter);
app.use('/api/flight-carriers', flightCarrierRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api', hotelMasterRoutes);
app.use('/api/cities', cityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));