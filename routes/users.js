const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Counter = require('../models/Counter'); // Import the Counter model

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const { name, number } = req.body;

    // Ensure that the number and name fields are present
    if (!name || !number) {
      return res.status(400).json({ message: 'Name and number are required' });
    }

    // Find and update the counter
    const counter = await Counter.findOneAndUpdate(
      { name: 'userId' }, // Query to find the counter by name
      { $inc: { value: 1 } }, // Increment the value
      { new: true, upsert: true } // Create if it doesn't exist
    );

    // Generate the userId in the format wbt-0001, wbt-0002, etc.
    const userId = `wbt-${String(counter.value).padStart(4, '0')}`;

    // Create the user with the generated userId
    const user = new User({
      userId,  // Ensure this field is included
      name,
      number,
    });

    // Save the user to the database
    const newUser = await user.save();
    
    // Return the newly created user in the response
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error in addUser:', err.message);
    res.status(400).json({ message: `Failed to add user: ${err.message}` });
  }
});

module.exports = router;
