// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { registerForceLogout } from '../utils/logoutHandler';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [token, setToken] = useState(null);

  const login = (accessToken, refreshToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(decoded);
      setToken(accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Помилка при декодуванні токена під час логіну:', error);
    }
  };  

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const forceLogoutWithMessage = () => {
    logout();
    setSessionExpired(true);
  };

  useEffect(() => {
    registerForceLogout(forceLogoutWithMessage);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (accessToken && refreshToken) {
      try {
        const decodedAccess = jwtDecode(accessToken);
        const decodedRefresh = jwtDecode(refreshToken);
  
        const isAccessExpired = decodedAccess.exp * 1000 < Date.now();
        const isRefreshExpired = decodedRefresh.exp * 1000 < Date.now();
  
        if (isRefreshExpired) {
          logout();
          return;
        }
  
        if (isAccessExpired && !isRefreshExpired) {
        }
  
        setIsAuthenticated(true);
        setUser(decodedAccess);
        setToken(accessToken);
      } catch (error) {
        console.error('Помилка при декодуванні токенів:', error);
        logout();
      }
    }
  }, []);  

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, sessionExpired, setSessionExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
};
