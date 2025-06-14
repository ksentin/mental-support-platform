// src/components/UserProfile/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import client from '../api/client';
import './UserProfile.css';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { token } = useAuth();
  console.log('Token:', token);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    name: '',
    age: '',
    gender: '',
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    client.get('/auth/profile/')
      .then((res) => {
        console.log('Дані профілю:', res.data);
        setUserData({
          username: res.data.username || '',
          email: res.data.email || '',
          name: res.data.name || '',
          age: res.data.age || '',
          gender: res.data.gender || 'prefer_not',
        });
      })
      .catch((err) => console.error(err));
  }, [token]);  

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .put('/auth/profile/', userData)
      .then(() => toast.success('Дані успішно оновлено'))
      .catch(() => toast.error('❌ Помилка оновлення'));
  };
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log('Sending change-password with data:', passwordData);
    console.log('Current token:', localStorage.getItem('accessToken'));
  
    client
      .post('/auth/change-password/', passwordData)
      .then(() => toast.success('Пароль змінено'))
      .catch((err) => {
        console.error('Error response:', err.response?.data);
        toast.error('❌ Помилка зміни пароля: ' + (err.response?.data?.detail || 'Unknown error'));
      });
  };
  
  
  return (
    <div className="user-profile">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h2>Профіль користувача</h2>
      {message && <p className="message">{message}</p>}
  
      <div className="profile-container">
        <div className="profile-info">
          <form onSubmit={handleSubmit}>
            <label>Ім'я користувача</label>
            <input type="text" name="username" value={userData.username || ''} onChange={handleChange} />
  
            <label>Email</label>
            <input type="email" name="email" value={userData.email || ''} onChange={handleChange} />
  
            <label>Ім’я</label>
            <input type="text" name="name" value={userData.name || ''} onChange={handleChange} />
  
            <label>Вік</label>
            <input type="number" name="age" value={userData.age || ''} onChange={handleChange} />
  
            <label>Стать</label>
            <select name="gender" value={userData.gender || 'prefer_not'} onChange={handleChange}>
              <option value="male">Чоловіча</option>
              <option value="female">Жіноча</option>
              <option value="other">Інше</option>
              <option value="prefer_not">Віддаю перевагу не вказувати</option>
            </select>
  
            <button type="submit">Зберегти</button>
          </form>
        </div>
  
        <div className="change-password">
          <h3>Зміна пароля</h3>
          <form onSubmit={handleChangePassword}>
            <label>Старий пароль</label>
            <input type="password" name="current_password" value={passwordData.current_password} onChange={handlePasswordChange} />
  
            <label>Новий пароль</label>
            <input type="password" name="new_password" value={passwordData.new_password} onChange={handlePasswordChange} />
  
            <button type="submit">Змінити пароль</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
