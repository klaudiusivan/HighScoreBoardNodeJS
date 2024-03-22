// authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Player = require('../models/playerModel'); // Corrected path

// User registration route
router.post('/register', async (req, res) => {
  try {
    // Extract user data from request body
    const { playerName, email, dateOfBirth, password } = req.body;

    // Check if player with the same email already exists
    const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new player
    const newPlayer = new Player({ playerName, email, dateOfBirth, password: hashedPassword });
    await newPlayer.save();

    res.status(201).json({ message: 'Player registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register player' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find player by email
    const player = await Player.findOne({ email });
    if (!player) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, player.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ playerId: player._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to authenticate player' });
  }
});

module.exports = router;
