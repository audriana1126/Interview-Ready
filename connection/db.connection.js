const mongoose = require('mongoose');
require('dotenv').config();

// update <username> and <password> with your credentials
const connectionStr = process.env.MONGO_DB;
console.log(connectionStr);

mongoose.connect(connectionStr)

mongoose.connection.on('connected', () => {
  console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`)
});

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error 😥', error);
});

mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'));