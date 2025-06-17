const express = require('express');
const Feedback = require('../models/Feedback');

const router = express.Router();

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET /api/feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch {
    res.status(500).json({ error: 'Unable to fetch feedback' });
  }
});

module.exports = router;
