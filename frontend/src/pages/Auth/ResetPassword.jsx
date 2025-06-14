// src/pages/Auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/auth/password-reset-confirm/${uid}/${token}/`, {
        password: password,  // тут ключ має бути саме 'password'
      });
      navigate('/login');
    } catch (err) {
      console.error('Помилка скидання паролю:', err);
      setError('Недійсне або прострочене посилання');
    }
  };

  return (
    <div className="password-reset-page">
      <div className="auth-container">
        <div className="auth-form">
          <h2>Новий пароль</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Новий пароль</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="password2">Повторіть пароль</label>
            <input
              type="password"
              id="password2"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <button type="submit" class="submit-btn">Скинути пароль</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
