const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/highscores';

async function connectToMongoDB(uri, options) {
    const client = new MongoClient(uri, options);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the database object for further use
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function closeConnection() {
    try {
        await client.close();
        console.log('Connection to MongoDB closed');
    } catch (error) {
        console.error('Error closing connection to MongoDB:', error);
    }
}


module.exports = { connectToMongoDB, closeConnection };