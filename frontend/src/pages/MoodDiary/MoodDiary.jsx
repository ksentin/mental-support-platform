import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './MoodDiary.css';

const MoodDiary = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfWeek = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Shift Sunday to the end, making Monday the start
  };

  const goToPrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDayOfWeek(year, month);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
    days.push(
      <div
        key={i}
        className={`day-cell ${selectedDate.getDate() === i ? 'selected' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => setSelectedDate(new Date(year, month, i))}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="mood-diary-page">
      <div className="page-header">
        <h1>Щоденник настрою</h1>
        <p>Обирай день, записуй свої емоції та відстежуй свій емоційний стан щодня 💙</p>
      </div>
  
      <div className="mood-diary-container">
        {/* Ліва частина — календар */}
        <div className="calendar-section">
          <div className="calendar">
            <div className="month">
              <FaAngleLeft className="prev" onClick={goToPrevMonth} />
              <div className="date">{monthNames[month]} {year}</div>
              <FaAngleRight className="next" onClick={goToNextMonth} />
            </div>
            <div className="weekdays">
              <div>Пн</div>
              <div>Вт</div>
              <div>Ср</div>
              <div>Чт</div>
              <div>Пт</div>
              <div>Сб</div>
              <div>Нд</div>
            </div>
            <div className="days-grid">
              {days}
            </div>
          </div>
        </div>
  
        {/* Права частина — форма */}
        <div className="entry-section">
          <h2>Запис на {selectedDate.toLocaleDateString()}</h2>
  
          <div className="mood-picker">
            <p>Як ти себе почуваєш?</p>
            <div className="emoji-list">
              <button>😄</button>
              <button>😊</button>
              <button>😐</button>
              <button>😞</button>
              <button>😢</button>
            </div>
          </div>
  
          <div className="entry-inputs">
            <label>
              Коментар:
              <textarea placeholder="Напиши коротко про свій день..." />
            </label>
  
            <div className="good-bad-wrapper">
              <label>
                Що було добре:
                <textarea placeholder="Згадай приємні моменти..." />
              </label>
              <label>
                Що було не дуже:
                <textarea placeholder="Згадай складнощі..." />
              </label>
            </div>
          </div>
  
          <button className="save-button">Зберегти</button>
        </div>
      </div>
    </div>
  );
  
};

export default MoodDiary;
