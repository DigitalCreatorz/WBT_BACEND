const express = require('express');
const router = express.Router();
const Package = require('../models/package');


// Get all packages
router.get('/', async (req, res) => {
    try {
      const packages = await Package.find();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create a new package
  router.post('/', async (req, res) => {
    const package = new Package(req.body);
    try {
      const newPackage = await package.save();
      res.status(201).json(newPackage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Update a package
  router.put('/:id', async (req, res) => {
    try {
      const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json(updatedPackage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a package
  router.delete('/:id', async (req, res) => {
    try {
      const deletedPackage = await Package.findByIdAndDelete(req.params.id);
      if (!deletedPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json({ message: 'Package deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;