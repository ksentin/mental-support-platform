import React from 'react';
import './ContactsPage.css';
import supportImg from '../../assets/images/Psychologist-bro.svg';

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <section className="contacts-hero">
        <div className="contacts-text">
          <h1>Контакти та підтримка</h1>
          <p>Ми поруч, коли тобі це потрібно. Нижче — важливі ресурси психологічної допомоги.</p>
        </div>
      </section>

      <section className="contacts-grid">
        <div className="contacts-box">
          <h2>📞 Лінії довіри</h2>
          <ul>
            <li>
              <strong>Національна гаряча лінія:</strong><br />
              0 800 500 335 або 116 123
            </li>
            <li>
              <strong>Lifeline Ukraine (ветерани):</strong><br />
              7333
            </li>
            <li>
              <strong>Телефон довіри для молоді:</strong><br />
              0 800 500 225 або 116 111
            </li>
            <li>
              <strong>"Розкажи мені":</strong><br />
              <a href="https://tellme.com.ua" target="_blank" rel="noopener noreferrer">tellme.com.ua</a>
            </li>
            <li>
              <strong>Червоний Хрест:</strong><br />
              0 800 331 800
            </li>
          </ul>
        </div>

        <div className="contacts-box">
          <h2>📧 Зв’язатися з нами</h2>
          <p>З питань співпраці або загальних звернень:</p>
          <ul>
            <li>Email: <a href="mailto:support@safeplace.ua">support@safeplace.ua</a></li>
            <li>Telegram: <a href="https://t.me/safeplace_support" target="_blank" rel="noopener noreferrer">@safeplace_support</a></li>
            <li>Instagram: <a href="https://instagram.com/safeplace.ua" target="_blank" rel="noopener noreferrer">@safeplace.ua</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;
