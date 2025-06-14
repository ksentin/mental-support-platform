// src/components/Header/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo.svg';
import { FiSearch, FiUser } from 'react-icons/fi'; 
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const [suggestions, setSuggestions] = React.useState([]);

  React.useEffect(() => {
    const fetchSuggestions = async () => {
      const query = searchQuery.trim();
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
  
      try {
        const res = await axios.get(`http://localhost:8000/api/search/?q=${query}`);
        const allSuggestions = Object.entries(res.data).flatMap(([type, items]) =>
          items.map((item) => ({
            id: item.id,
            title: item.title,
            type,
          }))
        );
        setSuggestions(allSuggestions.slice(0, 5)); // максимум 5 підказок
      } catch (error) {
        console.error('Помилка підказок:', error);
      }
    };
  
    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300); // debounce 300мс
  
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchClick = () => {
    if (!searchOpen) {
      setSearchOpen(true); // Відкрити пошук
    } else if (searchOpen && searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false); // Закрити поле після пошуку
      setSearchQuery('');
    } else {
      // Поле відкрите, але порожнє — закриваємо
      setSearchOpen(false);
      setSearchQuery('');
    }
  };  

  return (
    <header className="header">
      <nav className="nav-container">
        {/* Логотип */}
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={logo} alt="Mental Support Logo" className="logo-img" />
          </Link>
        </div>

        {/* Головне меню */}
        <div className="main-menu">
        <Link to="/#hero" className="menu-link">Головна</Link>
          <Link to="/#navigatemenu" className="menu-link">Сервіси</Link>
          <Link to="/about" className="menu-link">Про нас</Link>
          <Link to="/contacts" className="menu-link">Контакти</Link>
        </div>

        {/* Пошук та профіль */}
        <div className="user-actions">
          <div className={`search-container ${searchOpen ? 'active' : ''}`}>
          {searchOpen && (
            <>
              <input
                type="text"
                placeholder="Пошук..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim() !== '') {
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery('');
                    setSuggestions([]);
                  }
                }}                
                className="search-input"
              />

              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((s, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        navigate(`/search?q=${encodeURIComponent(s.title)}`);
                        setSearchOpen(false);
                        setSearchQuery('');
                        setSuggestions([]);
                      }}
                      className="suggestion-item"
                    >
                      {s.title} <span className="type-label">({s.type})</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

            <button onClick={handleSearchClick} className="search-button">
              <FiSearch className="icon" />
            </button>

          </div>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="auth-button">
                <FiUser className="icon" />
                <span>Профіль</span>
              </Link>
              <button onClick={handleLogout} className="auth-button">
                Вийти
              </button>
            </>
          ) : (
            <Link to="/login" className="auth-button">
              <FiUser className="icon" />
              <span>Увійти</span>
            </Link>
          )}
        </div>
      </nav>


      <div className="wave-divider">
        <svg viewBox="20 70 1420 210" preserveAspectRatio="none">
            <path
            fill="#b2cb3e"
            fillOpacity="1"
            stroke="#FFFFFF"
            strokeWidth="5"
            d="M0,288L24,240C48,192,96,96,144,90.7C192,85,240,171,288,192C336,213,384,171,432,181.3C480,192,528,256,576,245.3C624,235,672,149,720,144C768,139,816,213,864,218.7C912,224,960,160,1008,117.3C1056,75,1104,53,1152,90.7C1200,128,1248,224,1296,229.3C1344,235,1392,149,1416,106.7L1440,64L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
            ></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;