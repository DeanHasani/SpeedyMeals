import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/MealForm.css'; // Import the CSS file

const MealForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [prepTime, setPrepTime] = useState('');
  const [directions, setDirections] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/api/meals/${id}`)
        .then(response => {
          const meal = response.data;
          setName(meal.name);
          setIngredients(meal.ingredients);
          setPrepTime(meal.prepTime);
          setDirections(meal.directions);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    // Validate Dish Name
    if (name.length < 5) {
      newErrors.name = 'Dish name must be at least 5 characters long.';
    }

    // Validate Ingredients
    const validIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required.';
    } else {
      ingredients.forEach((ingredient, index) => {
        if (ingredient.trim() === '') {
          newErrors[`ingredient-${index}`] = 'Ingredient cannot be empty.';
        }
      });
    }

    // Validate Prep Time
    if (isNaN(prepTime)) {
      newErrors.prepTime = 'Prep time must be a number.';
    } else if (prepTime < 2 || prepTime > 240) {
      newErrors.prepTime = 'Prep time must be between 2 and 240 minutes.';
    }

    // Validate Directions
    if (directions.length < 10) {
      newErrors.directions = 'Directions must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const mealData = { name, ingredients: ingredients.filter(i => i.trim() !== ''), prepTime, directions };

    try {
      if (id) {
        await axios.put(`http://localhost:4000/api/meals/${id}`, mealData);
      } else {
        await axios.post(`http://localhost:4000/api/meals`, mealData);
      }
      navigate('/meals');
    } catch (error) {
      console.error('Error submitting meal:', error);
    }
  };

  return (
    <div className="meal-form-container">
      <form onSubmit={handleSubmit} noValidate>
        <h1>{id ? 'Update' : 'Add'} a Meal</h1>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/meals')}
        >
        Back to Meals
        </button>

        <div>
          <label>Dish Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength="3"
            maxLength="20"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="ingredient-inputs">
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index] = e.target.value;
                  setIngredients(newIngredients);
                }}
              />
              {errors[`ingredient-${index}`] && (
                <p className="error">{errors[`ingredient-${index}`]}</p>
              )}
            </div>
          ))}
          {errors.ingredients && <p className="error">{errors.ingredients}</p>}
        </div>

        <div>
          <label>Prep Time (minutes):</label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
            min="2"
            max="240"
          />
          {errors.prepTime && <p className="error">{errors.prepTime}</p>}
        </div>

        <div>
          <label>Directions:</label>
          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            required
            minLength="10"
          />
          {errors.directions && <p className="error">{errors.directions}</p>}
        </div>

        <button type="submit" className={id ? 'update-button' : ''}>
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default MealForm;