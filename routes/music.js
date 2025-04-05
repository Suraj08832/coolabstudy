const express = require('express');
const router = express.Router();

// Store music state in memory (in production, use a database)
let musicState = {
  isPlaying: false,
  currentTime: 0,
  currentTrack: null
};

// Update music state
router.post('/state', (req, res) => {
  const { isPlaying, currentTime, currentTrack } = req.body;
  musicState = { isPlaying, currentTime, currentTrack };
  res.json({ message: 'Music state updated successfully' });
});

// Get current music state
router.get('/state', (req, res) => {
  res.json(musicState);
});

module.exports = router; 