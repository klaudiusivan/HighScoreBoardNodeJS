const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/';
const dbName = 'highscore';

async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,  });
    try {
        // await client.connect();
        await mongoose.createConnection(`${uri}${dbName}`);
        console.log('Connected to MongoDB');
        // return client.db(dbName); // Return the database object for further use
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function closeConnection(client) {
    try {
        await client.close();
        console.log('Connection to MongoDB closed');
    } catch (error) {
        console.error('Error closing connection to MongoDB:', error);
    }
}

module.exports = { connectToMongoDB, closeConnection };
