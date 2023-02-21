import React from 'react';
import Home from '../Home/Home';
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import aboutUs from '../pages/aboutUs';
import reviews from '../pages/reviews';
import help from '../pages/help';
import login from '../pages/login';
import NavigationBar from '../NavigationBar/NavigationBar'

function App() {
  return (
    <div>
      <NavigationBar />
    </div>
  );

}

export default App;
