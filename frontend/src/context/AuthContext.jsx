// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // правильно імпортований

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // об'єкт користувача

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token); // оновлений виклик
        setIsAuthenticated(true);
        setUser(decoded); // зберігаємо розкодов. користувача
      } catch (error) {
        console.error('Помилка при декодуванні токену:', error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token); // оновлений виклик
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Помилка при декодуванні токену під час логіну:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
