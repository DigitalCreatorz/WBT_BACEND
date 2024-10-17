const Quotation = require('../models/Quotation');
const User = require('../models/User'); // Import User model

exports.createQuotation = async (req, res) => {
  try {
    const { bookingType, bookingData, quotation, username, vendorName } = req.body;
    const newQuotation = new Quotation({
      bookingType,
      bookingData,
      quotations: [quotation],
      username,
      vendorName
    });
    const savedQuotation = await newQuotation.save();
    res.status(201).json(savedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createBatchQuotations = async (req, res) => {
  try {
    const { quotations } = req.body;
    const savedQuotations = await Promise.all(
      quotations.map(async (quotationData) => {
        const newQuotation = new Quotation({
          bookingType: quotationData.bookingType,
          bookingData: quotationData.bookingData, // This now contains unique data for each quotation
          quotations: [quotationData.quotation],
          username: quotationData.username,
          vendorName: quotationData.vendorName
        });
        return await newQuotation.save();
      })
    );
    res.status(201).json(savedQuotations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuotation = async (req, res) => {
try {
const quotation = await Quotation.findById(req.params.id);
if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
 res.json(quotation);
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
};

exports.updateQuotation = async (req, res) => {
try {
const updatedQuotation = await Quotation.findByIdAndUpdate(
 req.params.id,
 req.body,
 { new: true }
 );
if (!updatedQuotation) return res.status(404).json({ message: 'Quotation not found' });
 res.json(updatedQuotation);
 } catch (error) {
 res.status(400).json({ message: error.message });
 }
};

exports.deleteQuotation = async (req, res) => {
try {
const deletedQuotation = await Quotation.findByIdAndDelete(req.params.id);
if (!deletedQuotation) return res.status(404).json({ message: 'Quotation not found' });
 res.json({ message: 'Quotation deleted successfully' });
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
};