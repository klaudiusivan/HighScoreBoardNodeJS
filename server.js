// server.js

const express = require('express');
const cors = require('cors');
const path = require('path'); // Import the path module
const { connectToMongoDB, closeConnection } = require('./server/database');
const playerRoutes = require('./server/routes/playerRoutes'); // Import the player routes
const authRoutes = require('./server/routes/authRoutes'); // Import the authentication routes
const { authenticateToken } = require('./server/authMiddleware'); // Import authentication middleware

const app = express();

// Start the server
async function startServer() {
    try {
        // Connect to MongoDB
        await connectToMongoDB();
        console.log('Connected to MongoDB'); 

        // Middleware for parsing JSON requests
        app.use(express.json());

        // Middleware for handling CORS
        app.use(cors());

        // Serve static files from the 'client/public' directory
        app.use(express.static(path.join(__dirname, 'client', 'public')));

        // Mount authentication routes
        app.use('/auth', authRoutes);

        // Mount player routes
        app.use('/api/players', playerRoutes);

        // Define default route
        app.get('/', (req, res) => {
            res.send('Hello, world!');
        });

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


// Start the server
startServer();
