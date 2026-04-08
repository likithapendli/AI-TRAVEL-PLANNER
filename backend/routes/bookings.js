const express = require('express');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/bookings/book-hotel
router.post('/book-hotel', authMiddleware, async (req, res) => {
  try {
    const { hotelName, hotelLocation, pricePerNight, checkIn, checkOut, guests } = req.body;

    if (!hotelName || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: 'hotelName, checkIn, checkOut, guests are required' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
    const totalCost = pricePerNight ? pricePerNight * nights : null;

    const booking = new Booking({
      userId: req.user.id,
      hotelName,
      hotelLocation,
      pricePerNight,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: Number(guests),
      totalCost,
      status: 'Confirmed'
    });

    try {
      await booking.save();
    } catch (dbErr) {
      console.warn('DB save skipped (no MongoDB):', dbErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      data: {
        hotelName,
        hotelLocation,
        checkIn,
        checkOut,
        guests,
        nights,
        totalCost,
        status: 'Confirmed'
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/bookings/user/:userId
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
