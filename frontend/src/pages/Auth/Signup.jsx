// src/pages/Auth/Signup.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import signupImage from '../../assets/images/signup.svg';

const Signup = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', {
        username: email,  // username = email, щоб відповідало serializer-у
        email: email,
        password: password,
        name: name,
        age: age,
        gender: gender,
      });
  
      console.log('Реєстрація успішна:', response.data);
      alert("Реєстрація успішна!");
      navigate('/login');  // перенаправити після успіху
  
    } catch (error) {
      console.error('Помилка при реєстрації:', error.response?.data || error.message);
      alert("Помилка при реєстрації: " + JSON.stringify(error.response?.data));
    }
  };
  
  

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-image">
          <img src={signupImage} alt="Signup visual" />
        </div>

        <div className="signup-form">
          <h2>Реєстрація</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Ім’я</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="age">Вік</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} min="10" max="100" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="gender">Стать</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Оберіть стать</option>
                  <option value="male">Чоловіча</option>
                  <option value="female">Жіноча</option>
                  <option value="other">Інше</option>
                  <option value="prefer_not">Віддаю перевагу не вказувати</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            <div className="checkbox">
              <input type="checkbox" required />
              <p>Я погоджуюсь з політикою конфіденційності</p>
            </div>

            <button type="submit">Зареєструватися</button>

            <p className="login-link">
              Вже маєте акаунт? <Link to="/login">Увійти</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
