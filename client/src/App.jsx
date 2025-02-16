import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealList from './components/MealList';
import MealForm from './components/MealForm';
import MealDetail from './components/MealDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/meals" element={<MealList />} />
        <Route path="/meals/:id/edit" element={<MealForm />} />
        <Route path="/meals/:id" element={<MealDetail />} />
        <Route path="/add-meal" element={<MealForm />} />
        <Route path="/" element={<MealList />} />
      </Routes>
    </Router>
  );
}

export default App;