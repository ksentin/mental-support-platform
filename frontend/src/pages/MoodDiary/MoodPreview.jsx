import { useEffect, useRef, useState } from 'react';
import './MoodPreview.css';

const MoodPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bookRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Сьогодні я почуваюсь прекрасно, адже...';

  const moodEmojis = ['😊', '😐', '😢', '😠', '😴', '😍'];

  const generateCalendar = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const emoji = moodEmojis[Math.floor(Math.random() * moodEmojis.length)];
      days.push({ day: i, emoji });
    }
    return days;
  };

  const [calendar] = useState(generateCalendar());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (bookRef.current) {
      observer.observe(bookRef.current);
    }

    return () => {
      if (bookRef.current) {
        observer.unobserve(bookRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let index = 0;
    let currentText = '';
    let interval;

    if (isVisible) {
      interval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setTypedText(currentText);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 80);
    } else {
      setTypedText('');
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className={`book ${isVisible ? 'open' : ''}`} ref={bookRef}>
      <div className="book-inner">
        <div className="back"></div>
        <div className="page6">
          <div className="page-content">
            <div id="typedtext">{typedText}</div>
          </div>
        </div>
        <div className="page5">
          <div className="moodcalendar">
            {calendar.map(({ day, emoji }) => (
              <div key={day} className="moodcalendar-cell">
                <div className="moodday">{day}</div>
                <div className="moodemoji">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="page4"></div>
        <div className="page3"></div>
        <div className="page2"></div>
        <div className="page1"></div>
        <div className="front">
          <div className="cover-title">
            <h1>Сторінки спокою</h1>
            <p>Твоє ментальне меню</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodPreview;
