// src/mooddiary/mooddiary.jsx
import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import client from '../../api/client';
import MoodChart from './MoodChart';
import './MoodDiary.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MoodDiary = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mood, setMood] = useState('');
  const [comment, setComment] = useState('');
  const [good, setGood] = useState('');
  const [bad, setBad] = useState('');
  const [entriesByDate, setEntriesByDate] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasEntry, setHasEntry] = useState(false);

  const moodOptions = [
    { value: 'happy', emoji: '😄' },
    { value: 'smile', emoji: '😊' },
    { value: 'neutral', emoji: '😐' },
    { value: 'sad', emoji: '😞' },
    { value: 'cry', emoji: '😢' },
  ];

  const moodToEmoji = moodOptions.reduce((acc, { value, emoji }) => {
    acc[value] = emoji;
    return acc;
  }, {});

  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getStartDayOfWeek = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const goToPrevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const goToNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDayOfWeek(year, month);

  const fetchMonthEntries = async () => {
    try {
      const startDate = new Date(year, month, 1).toISOString().split('T')[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

      const response = await client.get(`/mood/entries/?start_date=${startDate}&end_date=${endDate}`);
      const entries = response.data;

      const newMap = {};
      entries.forEach(entry => {
        newMap[entry.date] = entry;
      });
      setEntriesByDate(newMap);
    } catch (error) {
      console.error('Не вдалося завантажити записи:', error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const isoToday = today.toISOString().split('T')[0];
    const entry = entriesByDate[isoToday];
  
    setSelectedDate(today);
    if (entry) {
      setMood(entry.mood);
      setComment(entry.comment);
      setGood(entry.good_things);
      setBad(entry.bad_things);
      setHasEntry(true);
      setIsEditing(false);
    } else {
      setMood('');
      setComment('');
      setGood('');
      setBad('');
      setHasEntry(false);
      setIsEditing(true);
    }
  }, [entriesByDate]);

  useEffect(() => {
    fetchMonthEntries();
  }, [currentDate]);

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
  
    const isoDate = date.toISOString().split('T')[0];
    const entry = entriesByDate[isoDate];
  
    if (entry) {
      setMood(entry.mood);
      setComment(entry.comment);
      setGood(entry.good_things);
      setBad(entry.bad_things);
      setHasEntry(true);
      setIsEditing(false);
    } else {
      setMood('');
      setComment('');
      setGood('');
      setBad('');
      setHasEntry(false);
      setIsEditing(true);
    }
  };    

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(year, month, i);
    const isoDate = dateObj.toISOString().split('T')[0];
    const entry = entriesByDate[isoDate];
    const emoji = entry?.mood ? moodToEmoji[entry.mood] : null;

    const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

    days.push(
      <div
        key={i}
        className={`day-cell ${selectedDate.getDate() === i ? 'selected' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => handleDayClick(i)}
      >
        {i}
        <div className="emoji">{emoji}</div>
      </div>
    );
  }

  const handleSave = async () => {
    const isoDate = selectedDate.toISOString().split('T')[0];
    const existingEntry = entriesByDate[isoDate];
  
    const payload = {
      date: isoDate,
      mood,
      comment,
      good_things: good,
      bad_things: bad,
    };
  
    try {
      if (existingEntry) {
        await client.put(`/mood/entries/${existingEntry.id}/`, payload);
      } else {
        await client.post('/mood/entries/', payload);
      }
    
      toast.success('Запис збережено!');
      fetchMonthEntries();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.info('Потрібно увійти в акаунт, щоб зберігати записи.');
        } else if (error.response.status === 400) {
          toast.error('Будь ласка, заповніть всі обовʼязкові поля правильно.');
        } else {
          toast.error('Сталася помилка сервера. Спробуйте пізніше.');
        }
      } else {
        toast.error('Не вдалося зберегти запис. Перевірте підключення до Інтернету.');
      }
      console.error('Помилка збереження:', error);
    }
    
  };  

  return (
    <div className="mood-diary-page">
      <div className="page-header">
        <h1>Щоденник настрою</h1>
        <p>Обирай день, записуй свої емоції та відстежуй свій емоційний стан щодня 💙</p>
      </div>

    {/* === СЕКЦІЯ ЩОДЕННИКА === */}
    <section className="diary-section">
    <ToastContainer />
      <div className="mood-diary-container">
        <div className="calendar-section">
          <div className="calendar">
            <div className="month">
              <FaAngleLeft className="prev" onClick={goToPrevMonth} />
              <div className="date">{monthNames[month]} {year}</div>
              <FaAngleRight className="next" onClick={goToNextMonth} />
            </div>
            <div className="weekdays">
              <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Нд</div>
            </div>
            <div className="days-grid">{days}</div>
          </div>
        </div>

        <div className="entry-section">
          <h2>Запис на {selectedDate.toLocaleDateString()}</h2>
          <div className="mood-picker">
            <p>Як ти себе почуваєш?</p>
            <div className="emoji-list">
              {moodOptions.map(({ value, emoji }) => (
                <button
                key={value}
                onClick={() => isEditing && setMood(prev => prev === value ? '' : value)}
                className={mood === value ? 'selected' : ''}
                disabled={!isEditing}
              >
                {emoji}
              </button>              
              ))}
            </div>
          </div>

          <div className="entry-inputs">
            <label>
              Коментар:
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Напиши коротко про свій день..." readOnly={!isEditing}/>
            </label>
            <div className="good-bad-wrapper">
              <label>
                Що було добре:
                <textarea value={good} onChange={(e) => setGood(e.target.value)} placeholder="Згадай приємні моменти..." readOnly={!isEditing}/>
              </label>
              <label>
                Що було не дуже:
                <textarea value={bad} onChange={(e) => setBad(e.target.value)} placeholder="Згадай складнощі..." readOnly={!isEditing}/>
              </label>
            </div>
          </div>

          {!hasEntry && isEditing ? (
            // режим створення нового запису
            <button className="save-button" onClick={handleSave}>
              Зберегти
            </button>
          ) : hasEntry && !isEditing ? (
            // режим перегляду
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Змінити
            </button>
          ) : (
            // режим редагування існуючого запису
            <div className="edit-buttons">
              <button className="cancel-button" onClick={() => handleDayClick(selectedDate.getDate())}>
                Скасувати
              </button>
              <button className="save-button" onClick={handleSave}>
                Зберегти
              </button>
            </div>
          )}
        </div>
      </div>
    </section>

    {/* === СЕКЦІЯ АНАЛІТИКИ === */}
    <section className="analytics-section">
      <MoodChart entriesByDate={entriesByDate} />
    </section>
    </div>
  );
};

export default MoodDiary;
