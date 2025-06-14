import React, { useEffect, useState, useRef } from 'react';
import './breathing.css';

const CircleBreathingAnimation = ({ pattern, duration, isRunning, resetTrigger }) => {
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(pattern.inhale);
  const [totalTime, setTotalTime] = useState(0);

  const timerRef = useRef(null);
  const prevReset = useRef(resetTrigger);

  useEffect(() => {
    if (resetTrigger !== prevReset.current) {
      prevReset.current = resetTrigger;
      clearTimeout(timerRef.current);
      setPhase('inhale');
      setTimeLeft(pattern.inhale);
      setTotalTime(0);
      return;
    }

    if (!isRunning || totalTime >= duration) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft(prev => {
        if (prev > 1) return prev - 1;

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

  return (
    <div className="circle-container">
      <div className={`circle-animation ${phase}`}>
        <div className="circle-animation-text">
          {phase === 'inhale' ? 'Вдихайте' : phase === 'hold' ? 'Затримка' : 'Видихайте'}
          <div className="circle-animation-time">{timeLeft} сек</div>
        </div>
      </div>
      <div className="circle-animation-waves"></div>
    </div>
  );
};

export default CircleBreathingAnimation;
