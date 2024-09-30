const express = require('express');
const router = express.Router();
const HotelMaster = require('../models/HotelMaster');
const City = require('../models/city');

// Get all hotels
router.get('/hotelsmaster', async (req, res) => {
  try {
    const hotels = await HotelMaster.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new hotel
router.post('/hotelsmaster', async (req, res) => {
  const hotel = new HotelMaster({
    name: req.body.name,
    city: req.body.city,
    rating: req.body.rating
  });
  try {
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a hotel
router.put('/hotelsmaster/:id', async (req, res) => {
  try {
    const updatedHotel = await HotelMaster.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        city: req.body.city,
        rating: req.body.rating,
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a hotel
router.delete('/hotelsmaster/:id', async (req, res) => {
  try {
    await HotelMaster.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;