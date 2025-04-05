const express = require('express');
const router = express.Router();

// Store whiteboard data in memory (in production, use a database)
let whiteboardData = [];

// Save drawing data
router.post('/save', (req, res) => {
  const { data } = req.body;
  whiteboardData = data;
  res.json({ message: 'Drawing saved successfully' });
});

// Get drawing data
router.get('/data', (req, res) => {
  res.json(whiteboardData);
});

// Clear whiteboard
router.post('/clear', (req, res) => {
  whiteboardData = [];
  res.json({ message: 'Whiteboard cleared successfully' });
});

module.exports = router; 