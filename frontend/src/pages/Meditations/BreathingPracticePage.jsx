// src/pages/BreathingPracticePage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CircleBreathingAnimation from './animations/CircleBreathingAnimation';
import TriangleBreathingAnimation from './animations/TriangleBreathingAnimation';
import backgroundMusic from '../../assets/audio/meditation-relax-231757.mp3';
import SquareBreathingAnimation from './animations/SquareBreathingAnimation';
import './animations/squareBreathing.css';
import './animations/breathing.css';
import './BreathingPracticePage.css';
import './animations/triangleBreathing.css';

const BreathingPracticePage = () => {
  const { id } = useParams();
  const [practice, setPractice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  // Додаємо стани для керування
  const [isRunning, setIsRunning] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8000/api/meditations/${id}/`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setPractice(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching meditation:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleStart = () => {
    setIsRunning(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err =>
        console.log("Автовідтворення заблоковано:", err)
      );
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setResetCounter(prev => prev + 1);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (!practice) return <div>Практику не знайдено</div>;

  const renderAnimation = () => {
    const { breathing_pattern, duration } = practice;
    switch (practice.animation_type) {
      case 'circle':
        return (
          <CircleBreathingAnimation
            pattern={breathing_pattern}
            duration={duration}
            isRunning={isRunning}
            resetTrigger={resetCounter}
          />
        );
      case 'wave':
        return (
        <TriangleBreathingAnimation
            pattern={breathing_pattern}
            duration={duration}
            isRunning={isRunning}
            resetTrigger={resetCounter}
        />
        );
      case 'square':
        return (
          <SquareBreathingAnimation
            pattern={breathing_pattern}
            duration={duration}
            isRunning={isRunning}
            resetTrigger={resetCounter}
          />
        );
      default:
        return <div>Анімація не підтримується</div>;
    }
  };  

  return (
    <div className="breathing-practice-page">
        <audio ref={audioRef} src={backgroundMusic} loop />
      <div className="breathing-frame">
        <h1 className="title">{practice.title}</h1>
        <p className="description">{practice.description}</p>
        <div className="animation-wrapper">{renderAnimation()}</div>
        <div className="controls">
          <button onClick={handleStart}>Старт</button>
          <button onClick={handlePause}>Пауза</button>
          <button onClick={handleReset}>Скинути</button>
        </div>
        <div className="instructions">
            <h3>Інструкція</h3>
            <div className="instruction-columns">
                {practice.instruction && (
                <>
                    <div className="column">
                    {practice.instruction
                        .split('\n')
                        .filter((_, i) => i % 2 === 0)
                        .map((line, index) => (
                        <p key={`left-${index}`}>{line}</p>
                        ))}
                    </div>
                    <div className="column">
                    {practice.instruction
                        .split('\n')
                        .filter((_, i) => i % 2 === 1)
                        .map((line, index) => (
                        <p key={`right-${index}`}>{line}</p>
                        ))}
                    </div>
                </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingPracticePage;
