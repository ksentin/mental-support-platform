import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import signupImage from '../../assets/images/signup.svg';

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-image">
          <img src={signupImage} alt="Signup visual" />
        </div>

        <div className="signup-form">
          <h2>Реєстрація</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Ім’я</label>
                <input type="text" id="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="age">Вік</label>
                <input type="number" id="age" min="10" max="100" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="gender">Стать</label>
                <select id="gender" required>
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
                <input type="email" id="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" required />
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
