const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/';
const dbName = 'highscore';

async function connectToMongoDB() {
    try {
        await mongoose.connect(`${uri}${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function closeConnection() {
    try {
        await mongoose.disconnect();
        console.log('Connection to MongoDB closed');
    } catch (error) {
        console.error('Error closing connection to MongoDB:', error);
    }
}

module.exports = { connectToMongoDB, closeConnection };
