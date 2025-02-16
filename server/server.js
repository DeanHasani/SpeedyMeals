require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoose.config');
const mealRoutes = require('./routes/meal.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/meals', mealRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});