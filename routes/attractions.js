const express = require('express');
const router = express.Router();
const Attraction = require('../models/attraction');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Configure multer for Cloudinary upload
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'attractions',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

const upload = multer({ storage: storage });


// GET all attractions (non-deleted)
router.get('/', async (req, res) => {
  try {
    const attractions = await Attraction.find({ isDeleted: false });
    res.json(attractions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new attraction
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const attraction = new Attraction({
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      title: req.body.title,
      name: req.body.name,
      description: req.body.description,
      photoPath: req.file ? req.file.path : null
    });

    const newAttraction = await attraction.save();
    res.status(201).json(newAttraction);
  } catch (err) {
    console.error('Error adding attraction:', err);
    res.status(500).json({ message: 'An error occurred while adding the attraction', error: err.message });
  }
});


// Get all deleted attractions (must come before get by ID route)
router.get('/deleted', async (req, res) => {
  try {
    const deletedAttractions = await Attraction.find({ isDeleted: true });
    res.json(deletedAttractions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single attraction
router.get('/:id', getAttraction, (req, res) => {
  res.json(res.attraction);
});

// UPDATE an attraction
router.patch('/:id', upload.single('photo'), getAttraction, async (req, res) => {
  if (req.body.country != null) {
    res.attraction.country = req.body.country;
  }
  if (req.body.state != null) {
    res.attraction.state = req.body.state;
  }
  if (req.body.city != null) {
    res.attraction.city = req.body.city;
  }
  if (req.body.title != null) {
    res.attraction.title = req.body.title;
  }
  if (req.body.name != null) {
    res.attraction.name = req.body.name;
  }
  if (req.body.description != null) {
    res.attraction.description = req.body.description;
  }
  if (req.file) {
    // If there's an existing photo, delete it from Cloudinary
    if (res.attraction.photoPath) {
      const publicId = res.attraction.photoPath.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    res.attraction.photoPath = req.file.path;
  }
  if (req.body.isDeleted != null) {
    res.attraction.isDeleted = req.body.isDeleted;
    res.attraction.deletedAt = req.body.isDeleted ? new Date() : null;
  }

  try {
    const updatedAttraction = await res.attraction.save();
    res.json(updatedAttraction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (soft delete) an attraction
router.delete('/:id', getAttraction, async (req, res) => {
  try {
    res.attraction.isDeleted = true;
    res.attraction.deletedAt = new Date();
    await res.attraction.save();
    res.json({ message: 'Attraction soft deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restore a deleted attraction
router.post('/:id/restore', getAttraction, async (req, res) => {
  try {
    res.attraction.isDeleted = false;
    res.attraction.deletedAt = null;
    const restoredAttraction = await res.attraction.save();
    res.json(restoredAttraction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get attraction by ID
async function getAttraction(req, res, next) {
  let attraction;
  try {
    attraction = await Attraction.findById(req.params.id);
    if (attraction == null) {
      return res.status(404).json({ message: 'Cannot find attraction' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.attraction = attraction;
  next();
}

module.exports = router;