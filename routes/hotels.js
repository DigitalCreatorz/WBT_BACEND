// const express = require('express');
// const router = express.Router();
// const Hotel = require('../models/Hotel');
// const Counter = require('../models/Counter');

// // Function to get the next booking counter value
// async function getNextBookingCounter() {
//   const counter = await Counter.findOneAndUpdate(
//     { name: 'bookingCounter' },
//     { $inc: { value: 1 } },
//     { new: true, upsert: true }
//   );
//   return counter.value;
// }

// // Book a hotel
// router.post('/', async (req, res) => {
//   try {
//     const bookingCounter = await getNextBookingCounter();
    
//     // Generate the booking ID
//     const customerName = req.body.customerName || 'CUS';
//     const cityName = req.body.city || 'CTY';
//     const checkInStr = new Date(req.body.checkInDate).getDate().toString().padStart(2, '0');
//     const checkOutStr = new Date(req.body.checkOutDate).getDate().toString().padStart(2, '0');
    
//     const bookingId = `HB:INQ${bookingCounter}/${customerName.substring(0, 3).toUpperCase()}/${cityName.substring(0, 3).toUpperCase()}/${checkInStr}-${checkOutStr}`;

//     const hotelData = {
//       ...req.body,
//       bookingId: bookingId
//     };

//     const hotel = new Hotel(hotelData);
//     const newHotel = await hotel.save();
//     res.status(201).json(newHotel);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get all hotel bookings for a user
// router.get('/user/:userId', async (req, res) => {
//   try {
//     const hotels = await Hotel.find({ user: req.params.userId });
//     res.json(hotels);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //update boooking details 
// router.put('/:bookingId', async (req, res) => {
//   try {
//     const bookingId = req.params.bookingId;
//     console.log('Updating booking with ID:', bookingId);
//     console.log('Update data:', req.body);

//     const hotelData = req.body;
//     const hotel = await Hotel.findOneAndUpdate(
//       { bookingId: bookingId },
//       hotelData,
//       { new: true }
//     );

//     if (!hotel) {
//       console.log('Hotel booking not found');
//       return res.status(404).json({ message: 'Hotel booking not found' });
//     } else {
//       console.log('Hotel booking updated successfully');
//       return res.json(hotel);
//     }
//   } catch (err) {
//     console.error('Error updating hotel booking:', err);
//     return res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const Counter = require('../models/Counter');
const User = require('../models/User'); // Add this line

// Function to get the next booking counter value
async function getNextBookingCounter() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'bookingCounter' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
}

// Book a hotel
router.post('/', async (req, res) => {
  try {
    const bookingCounter = await getNextBookingCounter();
    
    // Generate the booking ID
    const customerName = req.body.customerName || 'CUS';
    const cityName = req.body.city || 'CTY';
    const checkInStr = new Date(req.body.checkInDate).getDate().toString().padStart(2, '0');
    const checkOutStr = new Date(req.body.checkOutDate).getDate().toString().padStart(2, '0');
    
    const bookingId = `HB:INQ${bookingCounter}/${customerName.substring(0, 3).toUpperCase()}/${cityName.substring(0, 3).toUpperCase()}/${checkInStr}-${checkOutStr}`;

    // Fetch the user to get the username
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hotelData = {
      ...req.body,
      bookingId: bookingId,
      userName: user.name // Add the username
    };

    const hotel = new Hotel(hotelData);
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all hotel bookings for a user
// Get all hotel bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const hotels = await Hotel.find({ user: req.params.userId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update booking details 
router.put('/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    console.log('Updating booking with ID:', bookingId);
    console.log('Update data:', req.body);

    const hotelData = req.body;

    // If the user is being updated, fetch the new username
    if (hotelData.user) {
      const user = await User.findById(hotelData.user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      hotelData.userName = user.name;
    }

    const hotel = await Hotel.findOneAndUpdate(
      { bookingId: bookingId },
      hotelData,
      { new: true, runValidators: true }
    );

    if (!hotel) {
      console.log('Hotel booking not found');
      return res.status(404).json({ message: 'Hotel booking not found' });
    } else {
      console.log('Hotel booking updated successfully');
      return res.json(hotel);
    }
  } catch (err) {
    console.error('Error updating hotel booking:', err);
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;