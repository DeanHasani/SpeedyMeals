const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dish name is required'],
    minlength: [3, 'Dish name must be at least 3 characters long'],
    maxlength: [20, 'Dish name cannot exceed 20 characters'],
  },
  ingredients: {
    type: [String],
    default: [],
  },
  prepTime: {
    type: Number,
    required: [true, 'Preparation time is required'],
    min: [2, 'Preparation time must be at least 2 minutes'],
    max: [240, 'Preparation time cannot exceed 240 minutes'],
  },
  directions: {
    type: String,
    required: [true, 'Directions are required'],
    minlength: [10, 'Directions must be at least 10 characters long'],
  },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;