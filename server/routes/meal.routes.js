const express = require('express');
const router = express.Router();
const Meal = require('../models/meal.model');

// Get all meals
router.get('/', async (req, res) => {
    try {
      const meals = await Meal.find();
      if (!meals) {
        return res.status(404).json({ error: 'No meals found' });
      }
      res.json(meals); // Ensure this is an array
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Get a single meal by ID
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new meal
router.post('/', async (req, res) => {
  try {
    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a meal by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMeal) return res.status(404).json({ error: 'Meal not found' });
    res.json(updatedMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a meal by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    if (!deletedMeal) return res.status(404).json({ error: 'Meal not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;