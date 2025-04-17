// src/pages/Home/Home.jsx
import React, { useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import psychologistImage from '../../assets/images/Psychologist-bro.svg';
import diaryImage from '../../assets/images/diary.svg';
import articlesImage from '../../assets/images/articles.svg';
import meditationsImage from '../../assets/images/meditation.svg';

const Home = () => {
  const moodRef = useRef(null);
  const articlesRef = useRef(null);
  const meditationsRef = useRef(null);
  const navigatemenu = useRef(null);
  const navigate = useNavigate();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-snap-container">
      {/* HERO */}
      <section className="snap-section hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1>
              Розкажи мені, як ти<br />
              почуваєшся <span className="highlight">НАСПРАВДІ</span>
            </h1>
            <p className="subtitle">
              Твій безпечний простір для підтримки ментального здоров'я та емоційного благополуччя
            </p>
            <button className="cta-button" onClick={() => scrollToSection(navigatemenu)}>
              Почати
            </button>
          </div>
          <div className="hero-image">
            <img src={psychologistImage} alt="Психологічна підтримка" className="psychologist-img" />
          </div>
        </div>
      </section>

      {/* МЕНЮ МОДУЛІВ */}
      <section className="snap-section module-section" ref={navigatemenu}>
        <img src="/src/assets/images/uuundulate.svg" alt="decor" className="splatter top-left" />
        <img src="/src/assets/images/uuundulate2.svg" alt="decor" className="splatter bottom-right" />
        <div className="module-grid">
          <div className="module-card" onClick={() => scrollToSection(moodRef)}>
            <h3>Щоденник настрою</h3>
            <img src={diaryImage} alt="Щоденник настрою" />
            <p>Відслідковуй емоційний стан та прогрес щодня.</p>
          </div>
          <div className="module-card" onClick={() => scrollToSection(articlesRef)}>
            <h3>Корисні статті</h3>
            <img src={articlesImage} alt="Корисні статті" />
            <p>Техніки релаксації, поради, статті про ментальне здоров'я.</p>
          </div>
          <div className="module-card" onClick={() => scrollToSection(meditationsRef)}>
            <h3>Медитації</h3>
            <img src={meditationsImage} alt="Медитації" />
            <p>Релакс, фокус, відновлення – підбірки медитацій на будь-який стан.</p>
          </div>
        </div>
        <p>Релакс, фокус, відновлення – підбірки медитацій на будь-який стан.</p>
      </section>

      {/* МОДУЛІ */}
      <section className="snap-section" ref={moodRef}>
        <h2>Щоденник настрою</h2>
        <p>Відслідковуй свій емоційний стан щодня та спостерігай за змінами.</p>
        <button onClick={() => navigate('/mood')}>Перейти</button>
      </section>

      <section className="snap-section" ref={articlesRef}>
        <h2>Корисні статті</h2>
        <p>Читайте поради, техніки релаксації та матеріали про ментальне здоров’я.</p>
        <button onClick={() => navigate('/articles')}>Перейти</button>
      </section>

      <section className="snap-section" ref={meditationsRef}>
        <h2>Медитації</h2>
        <p>Музика, відео та голосові практики для заспокоєння, фокусу, зняття стресу.</p>
        <button onClick={() => navigate('/meditations')}>Перейти</button>
      </section>
    </div>
  );
};

export default Home;
