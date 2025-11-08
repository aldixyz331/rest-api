require('../settings');
const mongoose = require('mongoose');

function connectMongoDb() {
    if (!MONGO_DB_URI || MONGO_DB_URI === "") {
        console.log('⚠️  MongoDB URI is not configured. Please set MONGO_DB_URI in settings.js');
        return;
    }
    
    mongoose.connect(MONGO_DB_URI)
        .then(() => {
            console.log('✅ Successfully connected to MongoDB');
        })
        .catch((error) => {
            console.error('❌ MongoDB connection error:', error.message);
        });
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
    db.on('disconnected', () => {
        console.log('⚠️  MongoDB disconnected');
    });
};

module.exports.connectMongoDb = connectMongoDb;