// playerRoutes.js

const express = require('express');
const router = express.Router();
const Player = require('./playerModel');
const { validationResult } = require('express-validator'); // Import validation result from express-validator
const { verifyToken } = require('./authMiddleware');

// Validate input data using express-validator middleware
router.post(
  '/register',
  [
    // Add validation rules for player registration fields
    // Example: check if player name is not empty and is of type string
    body('playerName').notEmpty().isString(),
    // Add more validation rules as needed
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new player instance with data from request body
      const newPlayer = new Player(req.body);

      // Save the new player to the database
      const savedPlayer = await newPlayer.save();

      // Respond with success message and saved player data
      res.status(201).json({
        status: 'success',
        data: {
          player: savedPlayer
        }
      });
    } catch (error) {
      // Handle errors and respond with error message
      res.status(500).json({
        status: 'error',
        message: 'Failed to register player'
      });
    }
  }
);

// Protected route for submitting scores
router.post('/submit-score', verifyToken, async (req, res) => {
    // Get player ID from request object (added by auth middleware)
    const playerId = req.playerId;
  
    // Example: Update player's score in the database
    try {
      const player = await Player.findById(playerId);
      player.score = req.body.score;
      await player.save();
      res.status(200).json({ message: 'Score submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit score' });
    }
  });
  
  module.exports = router;
  
