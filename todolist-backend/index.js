// /todolist-backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests
app.get("/", (req, res) => {
    res.json("Hello");
})
// MongoDB connection
const mongoURI = 'mongodb+srv://applac69:1234567Yes@todolist.wcao9.mongodb.net/?retryWrites=true&w=majority&appName=todolist';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/tasks', require('./routes/tasks')); // Tasks API route

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
