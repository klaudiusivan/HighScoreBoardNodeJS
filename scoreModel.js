const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  gameType: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Score', scoreSchema);