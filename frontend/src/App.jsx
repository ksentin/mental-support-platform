// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import MoodDiary from './pages/MoodDiary/MoodDiary';
import UsefulArticles from './pages/UsefulArticles/UsefulArticles';
import MeditationPreview from './pages/Meditations/MeditationPreview';
import MeditationList from './pages/Meditations/MeditationList';
import MeditationDetail from './pages/Meditations/MeditationDetail';
import BreathingPracticePage from './pages/Meditations/BreathingPracticePage';
import ArticlePage from './pages/UsefulArticles/ArticlePage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AboutPage from './pages/About/AboutPage.jsx';
import ContactsPage from './pages/Contacts/ContactsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';
import SearchResultsPage from './components/SearchResultsPage';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import { useAuth } from './context/AuthContext';
import './styles/main.css';

function App() {
  const location = useLocation();
  const { sessionExpired, setSessionExpired } = useAuth();

  const isMobile = window.innerWidth <= 600;
  const hideFooter = location.pathname === '/' && isMobile;

  return (
    <div className="app">
      <Header />
      
      {sessionExpired && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Сесія завершена</h2>
            <p>Ваша сесія закінчилась. Будь ласка, увійдіть знову.</p>
            <button onClick={() => setSessionExpired(false)}>Закрити</button>
          </div>
        </div>
      )}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<UsefulArticles />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/mood" element={<ProtectedRoute> <MoodDiary /> </ProtectedRoute>}/>
          <Route path="/meditations" element={<MeditationList />} />
          <Route path="/meditations/:id" element={<MeditationDetail />} />
          <Route path="/breathing/:id" element={<BreathingPracticePage />} />
        </Routes>
      </main>

      <Footer hidden={hideFooter} />
    </div>
  );
}

export default App;
