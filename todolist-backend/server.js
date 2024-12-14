const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB connection
const mongoURI = process.env.MONGO_URL; // Fetch MongoDB URI from .env file
if (!mongoURI) {
  console.error('MONGO_URL is not defined in .env file');
  process.exit(1); // Exit the application if the MongoDB URI is missing
}

mongoose.connect(process.env.MONGO_URL)
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
