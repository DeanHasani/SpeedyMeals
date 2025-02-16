import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/MealDetail.css';

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/meals/${id}`)
      .then(response => setMeal(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/meals/${id}`);
      navigate('/meals');
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  if (!meal) return <div>Loading...</div>;

  return (
    <div className="meal-detail-container">
       <button
          type="button"
          className="back-button"
          onClick={() => navigate('/meals')}
        >
        Back to Meals
        </button>
      <h1>{meal.name}</h1>
      <p>Cook Time: {meal.prepTime} minutes</p>
      <h2>Ingredients</h2>
      <ul>
        {meal.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Directions</h2>
      <p className="directions">{meal.directions}</p>
      <div className="button-container">
        <button className="edit-button" onClick={() => navigate(`/meals/${meal._id}/edit`)}>Edit</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MealDetail;