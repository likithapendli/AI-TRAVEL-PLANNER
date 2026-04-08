const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
