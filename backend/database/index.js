const mongoose = require('mongoose');
const { MONGODB_CONNECTION_STRING } = require('../config/index');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
        // console.error(error.message);
        // process.exit(1);
    }
};

module.exports = connectDB;