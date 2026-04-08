const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotelName: { type: String, required: true },
  hotelLocation: { type: String },
  pricePerNight: { type: Number },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true, default: 1 },
  totalCost: { type: Number },
  status: { type: String, default: 'Confirmed' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
