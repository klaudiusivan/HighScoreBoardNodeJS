const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Player', playerSchema);