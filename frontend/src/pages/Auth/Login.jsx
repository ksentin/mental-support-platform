// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import loginImage from '../../assets/images/login.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username: email,
        password: password
      });

      const { access, refresh } = response.data;

      // зберігаються токени та оновлюється глобальний стан авторизації
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      login(access, refresh);

      navigate('/');
    } catch (error) {
      console.error('Помилка логіну:', error);
      alert('Невірний email або пароль');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content login-content">
        <div className="auth-form">
          <h2>Вхід</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Забули пароль?</Link>
            </div>

            <button type="submit" className="login-button">Увійти</button>
          </form>

          <div className="auth-switch">
            <span>Ще не зареєстровані? </span>
            <Link to="/signup">Створити акаунт</Link>
          </div>
        </div>

        <div className="auth-image">
          <img src={loginImage} alt="Login visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
