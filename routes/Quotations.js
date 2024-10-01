const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotationss');

// Create a new quotation
router.post('/', async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all quotations
router.get('/', async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific quotation
router.get('/:id', getQuotation, (req, res) => {
  res.json(res.quotation);
});

// Update a quotation
router.patch('/:id', getQuotation, async (req, res) => {
  if (req.body.bookingId != null) {
    res.quotation.bookingId = req.body.bookingId;
  }
  // Add other fields here...

  try {
    const updatedQuotation = await res.quotation.save();
    res.json(updatedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a quotation
router.delete('/:id', getQuotation, async (req, res) => {
  try {
    await res.quotation.remove();
    res.json({ message: 'Quotation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get quotation by ID
async function getQuotation(req, res, next) {
  let quotation;
  try {
    quotation = await Quotation.findById(req.params.id);
    if (quotation == null) {
      return res.status(404).json({ message: 'Quotation not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.quotation = quotation;
  next();
}

module.exports = router;