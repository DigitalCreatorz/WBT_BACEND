const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(201).json({
      message: 'Flight booked successfully',
      flight: {
        FbookingId: savedFlight.FbookingId,
        from: savedFlight.from,
        to: savedFlight.to,
        departureDate: savedFlight.departureDate,
        returnDate: savedFlight.returnDate,
        class: savedFlight.class,
        specialInstructions: savedFlight.specialInstructions
      }
    });
  } catch (error) {
    console.error('Error booking flight:', error);
    res.status(400).json({ message: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const flights = await Flight.find().select('FbookingId from to departureDate');
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module. exports = router;