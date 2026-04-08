const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  budget: { type: Number, required: true },
  days: { type: Number, required: true },
  aiResponse: { type: Object, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
