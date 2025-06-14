// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/auth/password-reset/', {
        email,
      });
      setMessage('Інструкції надіслано на вашу електронну пошту.');
    } catch (error) {
      console.error('Помилка відновлення пароля:', error);
      setMessage('Щось пішло не так. Спробуйте ще раз.');
    }
  };

  return (
    <div className="password-reset-page">
        <div className="auth-container">
        <div className="auth-form">
            <h2>Скидання паролю</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Введіть вашу електронну адресу:</label>
            <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" class="submit-btn">Надіслати посилання</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
