const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wedson_resort';
  
  mongoose.set('strictQuery', false);

  mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log('[Wedson Database] MongoDB Connected successfully.');
  });

  mongoose.connection.on('error', (err) => {
    isConnected = false;
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
  });

  // Non-blocking connection attempt with short timeout
  mongoose.connect(uri, {
    serverSelectionTimeoutMS: 1500,
    connectTimeoutMS: 1500
  }).then(() => {
    isConnected = true;
    console.log(`[Wedson Database] MongoDB Connected: ${mongoose.connection.host}`);
  }).catch((err) => {
    isConnected = false;
    console.log(`[Wedson Database] Operating in robust fallback mode: ${err.message}`);
  });
};

const getDbStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'MongoDB Live' : 'Persistent Local Store Active'
});

module.exports = { connectDB, getDbStatus };
