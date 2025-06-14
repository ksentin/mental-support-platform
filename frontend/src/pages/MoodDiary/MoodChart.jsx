import React, { useState } from 'react';
import { getTopKeywords } from '../../utils/nlpUtils';
import WordCloudSection from './WordCloudSection';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const moodMap = {
  'cry': 1,
  'sad': 2,
  'neutral': 3,
  'smile': 4,
  'happy': 5,
};

const moodLabels = {
  1: '😢',
  2: '😞',
  3: '😐',
  4: '😊',
  5: '😄',
};

const months = [
  'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
];

const getCurrentWeekDates = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    dates.push(d.toISOString().slice(5, 10));
  }
  return dates;
};

const MoodChart = ({ entriesByDate }) => {
  const [viewMode, setViewMode] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const rawData = Object.entries(entriesByDate)
    .map(([date, entry]) => ({
      fullDate: date,
      date: date.slice(5),
      moodValue: moodMap[entry.mood] || null,
    }))
    .filter(item => item.moodValue !== null);

  let data = [];

  if (viewMode === 'week') {
    const currentWeekDates = getCurrentWeekDates();
    data = rawData.filter(d => currentWeekDates.includes(d.date));
  } else if (viewMode === 'month') {
    const monthPrefix = String(selectedMonth + 1).padStart(2, '0') + '-';
    data = rawData.filter(d => d.date.startsWith(monthPrefix));
  }

  data.sort((a, b) => new Date(`2024-${a.date}`) - new Date(`2024-${b.date}`));

  // 👉 Аналітика
  const averageMood = data.length
    ? (data.reduce((sum, d) => sum + d.moodValue, 0) / data.length).toFixed(2)
    : null;

  const happiestDay = data.length
    ? data.reduce((max, d) => d.moodValue > max.moodValue ? d : max)
    : null;

  const saddestDay = data.length
    ? data.reduce((min, d) => d.moodValue < min.moodValue ? d : min)
    : null;

  const allEntries = Object.values(entriesByDate);
  const topKeywords = getTopKeywords(allEntries, selectedMonth);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <h3 style={{
        textAlign: 'center',
        fontSize: '1.5rem',
        marginBottom: '1rem',
        marginTop: '0rem',
        fontWeight: '800',
        fontFamily: "Comforta",
        color: '#4b4b4b',
      }}>
        Американські гірки настрою
      </h3>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        borderColor: '#94B506'
      }}>
        <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
          <option value="month">За місяць</option>
          <option value="week">За тиждень</option>
        </select>

        {viewMode === 'month' && (
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
            {months.map((name, index) => (
              <option key={index} value={index}>{name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Графік */}
      <ResponsiveContainer height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(tick) => moodLabels[tick]}
            tick={{ fontSize: 16 }}
          />
          <Tooltip
            formatter={(value) => moodLabels[value]}
            labelStyle={{ fontWeight: 'bold', color: '#333' }}
            contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: 8 }}
          />
          <Line
            type="monotone"
            dataKey="moodValue"
            stroke="#94B506"
            strokeWidth={3}
            dot={{ r: 6, stroke: '#94B506', strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Аналітика результатів */}
      {data.length > 0 && (
        <div style={{
          marginTop: '1.5rem',
          marginRight: '10rem',
          marginLeft: '10rem',
          padding: '1rem',
          backgroundColor: '#FFFCEE',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#333',
          fontFamily: "Comforta",
        }}>
          <p><strong>Середній настрій:</strong> {averageMood} {moodLabels[Math.round(averageMood)]}</p>
          <p><strong>Найщасливіший день:</strong> {happiestDay.date} {moodLabels[happiestDay.moodValue]}</p>
          <p><strong>Найскладніший день:</strong> {saddestDay.date} {moodLabels[saddestDay.moodValue]}</p>
        </div>
      )}

{topKeywords.length > 0 && (
  <WordCloudSection words={topKeywords} />
)}

    </div>
  );
};

export default MoodChart;
