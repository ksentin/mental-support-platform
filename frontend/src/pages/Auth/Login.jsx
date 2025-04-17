// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import loginImage from '../../assets/images/login.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', { email, password });
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
