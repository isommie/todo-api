const express = require('express');
const cors = require('cors'); // Import the cors middleware
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Use cors middleware to enable CORS
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/todos', require('./routes/todo'));



// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
