// playerModel.js

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Player', playerSchema);