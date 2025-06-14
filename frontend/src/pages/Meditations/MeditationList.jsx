// src/pages/Meditations/MeditationList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MeditationCard from './MeditationCard';
import './MeditationList.css';

const MeditationList = () => {
  const [meditations, setMeditations] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    min_duration: '',
    max_duration: ''
  });

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const params = {};

        if (filters.search) params.search = filters.search;
        if (filters.type) params.type = filters.type;
        if (filters.min_duration) params.min_duration = filters.min_duration;
        if (filters.max_duration) params.max_duration = filters.max_duration;

        const response = await axios.get('http://127.0.0.1:8000/api/meditations/', { params });
        setMeditations(response.data);
      } catch (error) {
        console.error('Помилка завантаження медитацій:', error);
      }
    };

    fetchMeditations();
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      min_duration: '',
      max_duration: ''
    });
  };

  return (
    <div className="meditation-list-page">
      <h2>Медитації та дихальні практики</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Пошук..."
          name="search"
          value={filters.search}
          onChange={handleInputChange}
        />
        <select name="type" value={filters.type} onChange={handleInputChange}>
          <option value="">Всі типи</option>
          <option value="breathing">Дихальні</option>
          <option value="relaxation">Релаксація</option>
          <option value="mindfulness">Усвідомленість</option>
          <option value="sleep">Сон</option>
        </select>
        <input
          type="number"
          name="min_duration"
          placeholder="Мін. тривалість (сек)"
          value={filters.min_duration}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="max_duration"
          placeholder="Макс. тривалість (сек)"
          value={filters.max_duration}
          onChange={handleInputChange}
        />
        <button onClick={clearFilters}>Скинути</button>
      </div>

      <div className="meditation-list">
        {meditations.length > 0 ? (
          meditations.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))
        ) : (
          <p>Немає результатів.</p>
        )}
      </div>
    </div>
  );
};

export default MeditationList;
