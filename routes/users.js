
// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Counter = require('../models/Counter');
const DeletedUser = require('../models/deletedUser');

// Update customer data
router.put('/:id', async (req, res) => {
  try {
    const customer = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users (customers)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user (customer)
router.post('/', async (req, res) => {
  try {
    const { name, number, email, city, referenceBy, referenceContact, gstNo } = req.body;
    
    // Ensure that all fields are present
    if (!name || !number || !email || !city || !referenceBy || !referenceContact || !gstNo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find and update the counter for generating a unique userId
    const counter = await Counter.findOneAndUpdate(
      { name: 'userId' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    const userId = `wbt-${String(counter.value).padStart(4, '0')}`;

    // Create a new user (customer)
    const user = new User({
      userId,
      name,
      number,
      email,
      city,
      referenceBy,
      referenceContact,
      gstNo
    });

    // Save the user to the database
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error in addUser:', err.message);
    res.status(400).json({ message: `Failed to add user: ${err.message}` });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Attempting to delete user with ID: ${req.params.id}`);

    const user = await User.findById(req.params.id);
    if (!user) {
      console.log(`User not found: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User found: ${JSON.stringify(user)}`);

    // Create a new DeletedUser document
    const deletedUser = new DeletedUser({
      name: user.name,
      number: user.number,
      email: user.email,
      city: user.city,
      referenceBy: user.referenceBy,
      referenceContact: user.referenceContact,
      gstNo: user.gstNo,
      deletedAt: new Date()
    });

    // Save the deleted user data
    await deletedUser.save();
    console.log(`Deleted user saved: ${deletedUser._id}`);

    // Remove the user from the active users collection
    await User.findByIdAndDelete(req.params.id);
    console.log(`User deleted from active collection: ${req.params.id}`);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// Get all deleted users
router.get('/deleted-users', async (req, res) => {
  try {
    const deletedUsers = await DeletedUser.find();
    res.json(deletedUsers);
  } catch (error) {
    console.error(`Error fetching deleted users: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;