import React, { useEffect, useState, useRef } from 'react';
import './triangleBreathing.css';

const TriangleBreathingAnimation = ({ pattern, duration, isRunning, resetTrigger }) => {
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(pattern.inhale);
  const [totalTime, setTotalTime] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  const timerRef = useRef(null);
  const prevReset = useRef(resetTrigger);

  useEffect(() => {
    if (resetTrigger !== prevReset.current) {
      prevReset.current = resetTrigger;
      clearTimeout(timerRef.current);
      setPhase('inhale');
      setTimeLeft(pattern.inhale);
      setTotalTime(0);
      setAnimateKey(k => k + 1);
      return;
    }

    if (!isRunning || totalTime >= duration) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft(prev => {
        if (prev > 1) return prev - 1;

        setAnimateKey(k => k + 1);

        if (phase === 'inhale') {
          setPhase('hold');
          return pattern.hold;
        }
        if (phase === 'hold') {
          setPhase('exhale');
          return pattern.exhale;
        }
        if (phase === 'exhale') {
          setPhase('inhale');
          return pattern.inhale;
        }

        return 0;
      });
      setTotalTime(t => t + 1);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [phase, timeLeft, pattern, duration, isRunning, totalTime, resetTrigger]);

  const phaseText = {
    inhale: 'Вдихайте',
    hold: 'Затримка',
    exhale: 'Видихайте',
  };

  const getAnimationStyle = (length) => ({
    animationDuration: `${length}s`,
  });

  return (
    <div className="triangle-container">
      <div className="triangle">
      <svg viewBox="-10 -10 220 193" xmlns="http://www.w3.org/2000/svg">
          {/* Синій базовий контур */}
          <polygon
            points="0,173 100,0 200,173"
            className="base-line breathing-pulse"
          />
          
          {/* Анімована сторона - INHALE (ліва) */}
          {phase === 'inhale' && isRunning && (
            <line
              key={animateKey}
              x1="0"
              y1="173"
              x2="100"
              y2="0"
              className="animated-line"
              style={{ animationDuration: `${pattern.inhale}s` }}
            />
          )}
  
          {/* HOLD – права сторона */}
          {phase === 'hold' && isRunning && (
            <line
              key={animateKey}
              x1="100"
              y1="0"
              x2="200"
              y2="173"
              className="animated-line"
              style={{ animationDuration: `${pattern.hold}s` }}
            />
          )}
  
          {/* EXHALE – нижня сторона */}
          {phase === 'exhale' && isRunning && (
            <line
              key={animateKey}
              x1="200"
              y1="173"
              x2="0"
              y2="173"
              className="animated-line"
              style={{ animationDuration: `${pattern.exhale}s` }}
            />
          )}
        </svg>
  
        <div className="center-text">
          <div>{phaseText[phase]}</div>
          <div className="triangle-time">{timeLeft} сек</div>
        </div>
      </div>
    </div>
  );
  
};

export default TriangleBreathingAnimation;