import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../style/MealList.css'; // Import the CSS file

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get(`http://localhost:4000/api/meals`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setMeals(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setMeals([]);
        }
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
        setMeals([]);
      });
  }, []);

  return (
    <div className="meal-list-container">
      <form className="meal-list-form">
      <img src="/meal.svg" alt="meals" width="140" height="150"></img>
      <h1>Speedy Meals</h1>
      {meals.length === 0 ? (
        <p>No good meals added yet.</p>
      ) : (
        <ul>
          {meals.map(meal => (
            <li key={meal._id}>
              <div className="meal-item">
                <span className="meal-name">{meal.name}</span>
                <span className="prep-time">Preparation time: {meal.prepTime} minutes</span>
                <button
                  className="view-button"
                  onClick={() => navigate(`/meals/${meal._id}`)} // Navigate to meal details
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add-meal" className="add-meal-link">Add a Meal</Link>
      </form>
    </div>
  );
};

export default MealList;