// server.js

const express = require('express');
const cors = require('cors');
const { connectToMongoDB, closeConnection } = require('./database');
const playerRoutes = require('./playerRoutes'); // Import the player routes

const app = express();

// Define MongoDB URI and options
const uri = 'mongodb://localhost:27017/highscores';
const options = { useNewUrlParser: true, useUnifiedTopology: true }; // Example options

// Start the server
async function startServer() {
    try {
        // Connect to MongoDB
        const db = await connectToMongoDB(uri, options);

        // Mount player routes
        app.use('/api/players', playerRoutes);

        // Start the server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });

        // Close the MongoDB connection when the server shuts down
        process.on('SIGINT', async () => {
            await closeConnection();
            console.log('Server shutting down');
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            await closeConnection();
            console.log('Server shutting down');
            process.exit(0);
        });
    } catch (error) {
        // Handle errors starting the server
        console.error('Failed to start the server:', error);
        process.exit(1); // Exit the process with a non-zero code to indicate failure
    }
}

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Define routes...
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
startServer();
