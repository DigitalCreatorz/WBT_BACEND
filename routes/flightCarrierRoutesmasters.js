// // routes/flightCarrierRoutes.js
// const express = require('express');
// const router = express.Router();
// const FlightCarrier = require('../models/FlightCarriermaster');

// // POST: Add a new flight carrier
// router.post('/add', async (req, res) => {
//   const { name, code } = req.body;
//   try {
//     const newCarrier = new FlightCarrier({ name, code });
//     await newCarrier.save();
//     res.status(201).json({ message: 'Flight carrier added successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Error adding flight carrier' });
//   }
// });

// // GET: Retrieve all flight carriers
// router.get('/', async (req, res) => {
//   try {
//     const carriers = await FlightCarrier.find();
//     res.status(200).json(carriers);
//   } catch (error) {
//     res.status(400).json({ error: 'Error fetching flight carriers' });
//   }
// });

// // PUT: Update a flight carrier
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, code } = req.body;
//   try {
//     await FlightCarrier.findByIdAndUpdate(id, { name, code });
//     res.status(200).json({ message: 'Flight carrier updated successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Error updating flight carrier' });
//   }
// });


// // PUT: Update a flight carrier
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, code } = req.body;
//   try {
//     await FlightCarrier.findByIdAndUpdate(id, { name, code });
//     res.status(200).json({ message: 'Flight carrier updated successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Error updating flight carrier' });
//   }
// });

// // PUT: Soft delete a flight carrier
// router.put('/:id/delete', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await FlightCarrier.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() });
//     res.status(200).json({ message: 'Flight carrier soft deleted successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Error soft deleting flight carrier' });
//   }
// });

// // PUT: Restore a soft deleted flight carrier
// router.put('/:id/restore', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await FlightCarrier.findByIdAndUpdate(id, { isDeleted: false, deletedAt: null });
//     res.status(200).json({ message: 'Flight carrier restored successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Error restoring flight carrier' });
//   }
// });

// module.exports = router;




// routes/flightCarrierRoutes.js
const express = require('express');
const router = express.Router();
const FlightCarrier = require('../models/FlightCarriermaster');

// POST: Add a new flight carrier
router.post('/add', async (req, res) => {
  const { name, code } = req.body;
  try {
    const newCarrier = new FlightCarrier({ name, code });
    await newCarrier.save();
    res.status(201).json({ message: 'Flight carrier added successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Error adding flight carrier' });
  }
});

// GET: Retrieve all active flight carriers
router.get('/', async (req, res) => {
  try {
    const carriers = await FlightCarrier.find({ isDeleted: false });
    res.status(200).json(carriers);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching flight carriers' });
  }
});

// GET: Retrieve all deleted flight carriers
router.get('/deleted', async (req, res) => {
  try {
    const deletedCarriers = await FlightCarrier.find({ isDeleted: true });
    res.status(200).json(deletedCarriers);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching deleted flight carriers' });
  }
});

// PUT: Update a flight carrier
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;
  try {
    await FlightCarrier.findByIdAndUpdate(id, { name, code });
    res.status(200).json({ message: 'Flight carrier updated successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating flight carrier' });
  }
});

// PUT: Soft delete a flight carrier
router.put('/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
    await FlightCarrier.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() });
    res.status(200).json({ message: 'Flight carrier soft deleted successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Error soft deleting flight carrier' });
  }
});

// PUT: Restore a soft deleted flight carrier
router.put('/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    await FlightCarrier.findByIdAndUpdate(id, { isDeleted: false, deletedAt: null });
    res.status(200).json({ message: 'Flight carrier restored successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Error restoring flight carrier' });
  }
});

module.exports = router;