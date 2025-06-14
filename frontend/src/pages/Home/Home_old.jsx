// src/pages/Home/Home.jsx
import React, { useRef, useState, useEffect} from 'react';
import './Home.css';
import { useNavigate, useLocation } from 'react-router-dom';
import psychologistImage from '../../assets/images/Psychologist-bro.svg';
import diaryImage from '../../assets/images/diary.svg';
import articlesImage from '../../assets/images/articles.svg';
import meditationsImage from '../../assets/images/meditation.svg';
import graficImage from '../../assets/images/analytics-bro.svg';
import MoodPreview from '../MoodDiary/MoodPreview'
import ArticlesPreview from '../UsefulArticles/ArticlesPreview';
import MeditationPreview from '../Meditations/MeditationPreview';
import Chatbot from "../../components/Chatbot";
import articlesprev from '../../assets/images/articlespreview.svg';
import { MessageCircle } from "lucide-react";

const Home = () => {
  const moodRef = useRef(null);
  const articlesRef = useRef(null);
  const meditationsRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigatemenu = useRef(null);
  const navigate = useNavigate();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1); // видаляє #
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Чекаємо, поки DOM повністю відрендериться
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100); // 100 мс затримки — щоб дочекався рендера
      }
    }
  }, [location]);

  return (
    <div className="home-wrapper">
    <div className="home-snap-container">
      {/* HERO */}
      <section className="snap-section hero" id="hero">
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
      <section className="snap-section module-section" id="navigatemenu" ref={navigatemenu}>
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
            <img src={articlesprev} alt="Корисні статті" />
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
        <h2 className="section-title">Щоденник настрою</h2>
        <div className="mood-section-content">
          <div className="mood-left">
            <h3 className="mood-subtitle">Відчуй себе — записуй, аналізуй, зростай</h3>
            <MoodPreview onNavigate={() => navigate('/mood')} />
          </div>
          <div className="mood-right">
            <div className="mood-right-inner">
              <p>
                Записуй свій настрій щодня одним смайликом, а також коментуй, що зробило день кращим або гіршим.
              </p>
              <div className="mood-content-with-image">
                <ul>
                  <li>Відслідковуй емоційні цикли</li>
                  <li>Знаходь тригери настрою</li>
                  <li>Сприяй саморефлексії</li>
                  <li>Візуалізуй прогрес</li>
                </ul>
                <div className="mood-image-block">
                  <img src={graficImage} alt="Mood analytics preview" />
                </div>
              </div>
              <button className="go-to-mood-btn" onClick={() => navigate('/mood')}>Перейти</button>
            </div>
          </div>
        </div>
      </section>

      <section className="snap-section" ref={articlesRef}>
        <h2 className="section-title">Корисні статті</h2>
        <ArticlesPreview onNavigate={() => navigate('/articles')} />
      </section>

      <section className="snap-section" ref={meditationsRef}>
        <h2 className="section-title">Медитації та релаксації</h2>
        <MeditationPreview onNavigate={() => navigate('/meditations')} />
      </section>

      {!isChatOpen && (
        <div onClick={() => setIsChatOpen(true)} className="chat-toggle-button">
          <MessageCircle size={20} />
          <span>Потребуєш розмови?</span>
        </div>
      )}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
          </div>
          </div>
        );
      };

export default Home;
