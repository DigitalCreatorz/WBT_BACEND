const express = require('express');
const router = express.Router();
const City = require('../models/City');

// Get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find().select('name');
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new city
router.post('/', async (req, res) => {
  const city = new City({
    name: req.body.name
  });
  try {
    const newCity = await city.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;