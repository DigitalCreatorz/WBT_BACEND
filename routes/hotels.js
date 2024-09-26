const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const Counter = require('../models/Counter');

// Function to get the next booking counter value
async function getNextBookingCounter() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'bookingCounter' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
}

// Book a hotel
router.post('/', async (req, res) => {
  try {
    const bookingCounter = await getNextBookingCounter();
    
    // Generate the booking ID
    const customerName = req.body.customerName || 'CUS';
    const cityName = req.body.city || 'CTY';
    const checkInStr = new Date(req.body.checkInDate).getDate().toString().padStart(2, '0');
    const checkOutStr = new Date(req.body.checkOutDate).getDate().toString().padStart(2, '0');
    
    const bookingId = `HB:INQ${bookingCounter}/${customerName.substring(0, 3).toUpperCase()}/${cityName.substring(0, 3).toUpperCase()}/${checkInStr}-${checkOutStr}`;

    const hotelData = {
      ...req.body,
      bookingId: bookingId
    };

    const hotel = new Hotel(hotelData);
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all hotel bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const hotels = await Hotel.find({ user: req.params.userId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;