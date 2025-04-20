// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import MoodDiary from './pages/MoodDiary/MoodDiary';
import UsefulArticles from './pages/UsefulArticles/UsefulArticles';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header /> {/* Шапка на всіх сторінках */}
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mood" element={<MoodDiary />} /> 
            <Route path="/articles" element={<UsefulArticles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/mood"
              element={
                <ProtectedRoute>
                  <MoodDiary />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        
        <Footer /> {/* Підвал на всіх сторінках */}
      </div>
    </Router>
  );
}

export default App;