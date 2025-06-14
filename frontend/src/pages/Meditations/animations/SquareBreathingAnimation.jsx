import React, { useEffect, useState, useRef } from 'react';
import './squareBreathing.css';

const SquareBreathingAnimation = ({ pattern, duration, isRunning, resetTrigger }) => {
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
          setPhase('hold2');
          return pattern.hold2 || 0;
        }
        if (phase === 'hold2') {
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
    hold2: 'Затримка',
  };

  const getAnimationStyle = (length) => ({
    animationDuration: `${length}s`
  });

  return (
    <div className="square-container">
      <div className="square">
        <div className="side top">
          {phase === 'inhale' && isRunning && (
            <div
              key={animateKey}
              className="fill animate"
              style={getAnimationStyle(pattern.inhale)}
            />
          )}
        </div>
        <div className="side right">
          {phase === 'hold' && isRunning && (
            <div
              key={animateKey}
              className="fill animate"
              style={getAnimationStyle(pattern.hold)}
            />
          )}
        </div>
        <div className="side bottom">
          {phase === 'exhale' && isRunning && (
            <div
              key={animateKey}
              className="fill animate"
              style={getAnimationStyle(pattern.exhale)}
            />
          )}
        </div>
        <div className="side left">
          {phase === 'hold2' && isRunning && (
            <div
              key={animateKey}
              className="fill animate"
              style={getAnimationStyle(pattern.hold2 || 0)}
            />
          )}
        </div>
        <div className="center-text">
          <div>{phaseText[phase]}</div>
          <div className="square-time">{timeLeft} сек</div>
        </div>
      </div>
    </div>
  );
};

export default SquareBreathingAnimation;
