// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>safe place</h3>
          <p>Місце для внутрішнього спокою та відновлення</p>
        </div>
        <div className="footer-links">
          <a href="/mood">Щоденник настрою</a>
          <a href="/articles">Статті</a>
          <a href="/meditations">Медитації</a>
          <a href="/chatbot">AI-чатбот</a>
        </div>
        <div className="footer-contact">
          <p>Контакти: support@mindsupport.app</p>
          <p>&copy; {new Date().getFullYear()} MindSupport</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
