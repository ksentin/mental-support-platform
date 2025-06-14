// src/pages/Meditations/MeditationPreview.jsx
import React from 'react';
import './MeditationPreview.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

const MeditationPreview = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/meditations');
  };

  return (
    <div className="meditation-preview">
      <div className="meditation-text">
        <h3>Заспокойся. Дихай. Відпусти.</h3>
        <blockquote>
          «Справжній спокій не зовні, а всередині тебе.»
        </blockquote>
        <p>
          У нашому розділі ти знайдеш медитації, що допоможуть тобі зняти напругу,
          зосередитися і відновити внутрішній баланс.
        </p>
        <button className="go-to-meditations-btn" onClick={handleNavigate}>
          Перейти
        </button>
      </div>
      <div className="meditation-animation">
        <DotLottieReact
          src="https://lottie.host/b631adbb-52a7-4d2c-bc31-2bb63cfc7340/byVkLs3jT9.lottie"
          autoplay
          loop
        />
      </div>
    </div>
  );
};

export default MeditationPreview;
