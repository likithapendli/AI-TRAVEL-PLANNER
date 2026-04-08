const express = require('express');
const nodemailer = require('nodemailer');
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/auth');
const generateTravelPlan = require('../utils/aiHelper');

const router = express.Router();

// POST /api/trips/plan-trip
router.post('/plan-trip', authMiddleware, async (req, res) => {
  try {
    const { destination, budget, days } = req.body;

    if (!destination || !budget || !days) {
      return res.status(400).json({ message: 'destination, budget and days are required' });
    }

    const aiResponse = await generateTravelPlan(destination, Number(budget), Number(days));

    // Save trip to DB
    const trip = new Trip({
      userId: req.user.id,
      destination,
      budget: Number(budget),
      days: Number(days),
      aiResponse
    });

    try {
      await trip.save();
    } catch (dbErr) {
      console.warn('DB save skipped (no MongoDB):', dbErr.message);
    }

    res.json({ success: true, data: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/trips/user/:userId
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, data: trips });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/trips/send-email
router.post('/send-email', authMiddleware, async (req, res) => {
  try {
    const { email, tripData } = req.body;

    if (!email || !tripData) {
      return res.status(400).json({ message: 'Email and tripData are required' });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const { destination, budget, days, temples, famous_places, hotels, restaurants, daily_schedule } = tripData;

    // Generate HTML Body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h1 style="color: #2563eb; text-align: center;">Your Travel Plan for ${destination} ✈️</h1>
        <p style="text-align: center; color: #666;">Budget: ₹${budget} | Duration: ${days} Days</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        ${temples?.length ? `
          <h3>🛕 Spiritual & Historical Sites</h3>
          <ul>${temples.slice(0, 5).map(t => `<li><strong>${t.name}</strong> - ${t.location}</li>`).join('')}</ul>
        ` : ''}

        ${famous_places?.length ? `
          <h3>📍 Famous Landmarks</h3>
          <ul>${famous_places.slice(0, 5).map(p => `<li><strong>${p.name}</strong> - ${p.location}</li>`).join('')}</ul>
        ` : ''}

        ${hotels?.length ? `
          <h3>🏨 Recommended Hotels</h3>
          <ul>${hotels.slice(0, 5).map(h => `<li><strong>${h.name}</strong> - ₹${h.pricePerNight}/night</li>`).join('')}</ul>
        ` : ''}

        ${restaurants?.length ? `
          <h3>🍽️ Popular Restaurants</h3>
          <ul>${restaurants.slice(0, 5).map(r => `<li><strong>${r.name}</strong> - ${r.cuisine}</li>`).join('')}</ul>
        ` : ''}

        <h3>🗓️ Daily Schedule Highlights</h3>
        ${daily_schedule?.map(day => `
          <div style="background: #f9fafb; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            <p><strong>Day ${day.day}:</strong> ${day.places.map(p => p.name).join(', ')}</p>
          </div>
        `).join('')}

        <p style="text-align: center; margin-top: 30px; font-weight: bold; color: #2563eb;">Have a great trip! 🎉</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Travel Plan for ${destination} ✈️`,
      html: htmlBody
    };

    // For simulation if no env vars are present
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('--- SIMULATED EMAIL ---');
      console.log('To:', email);
      console.log('Subject:', mailOptions.subject);
      console.log('Body HTML length:', htmlBody.length);
      console.log('-----------------------');
      return res.json({ success: true, message: 'Trip plan sent successfully (SIMULATED)!' });
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Trip plan sent successfully!' });

  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Error sending email', error: err.message });
  }
});

module.exports = router;
