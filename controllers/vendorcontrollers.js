

const Vendor = require('../models/vendor');

const createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ deleted: false });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDeletedVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ deleted: true });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json({ message: 'Vendor marked as deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const restoreVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, { deleted: false }, { new: true });
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json({ message: 'Vendor restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getVendorsByService = async (req, res) => {
  try {
    const { service } = req.params;
    const vendors = await Vendor.find({ services: service, deleted: false });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getDeletedVendors,
  getVendor,
  updateVendor,
  deleteVendor,
  restoreVendor,
  getVendorsByService

};