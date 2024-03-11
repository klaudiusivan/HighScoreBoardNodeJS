// playerRoutes.js

const express = require('express');
const router = express.Router();
const Player = require('./playerModel');
const { body, validationResult } = require('express-validator'); // Import validation modules from express-validator
const { verifyToken } = require('./authMiddleware'); // Import authentication middleware

// Route for player registration
router.post(
  '/register',
  [
    // Validation rules for player registration fields
    body('playerName').notEmpty().isString().withMessage('Player name must be a non-empty string'),
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

// Route for submitting scores (protected)
router.post('/submit-score',
  [
    // Validation rules for score data
    body('score').notEmpty().isInt().withMessage('Score must be a non-empty integer'),
    // Add more validation rules as needed
  ],
  verifyToken, // Apply authentication middleware
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get player ID from request object (added by auth middleware)
    const playerId = req.playerId;

    try {
      // Find the player in the database
      const player = await Player.findById(playerId);

      // Update player's score with data from request body
      player.score = req.body.score;

      // Save the updated player to the database
      await player.save();

      // Respond with success message
      res.status(200).json({ message: 'Score submitted successfully' });
    } catch (error) {
      // Handle errors and respond with error message
      res.status(500).json({ message: 'Failed to submit score' });
    }
  }
);


module.exports = router;

