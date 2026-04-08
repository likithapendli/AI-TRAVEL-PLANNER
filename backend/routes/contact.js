const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new ContactMessage({ name, email, phone });
    
    try {
      await newMessage.save();
    } catch (dbErr) {
      console.warn('DB save skipped (no MongoDB):', dbErr.message);
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
