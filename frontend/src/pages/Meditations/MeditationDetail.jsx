// src/pages/Meditations/MeditationDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MeditationDetail.css';

const MeditationDetail = () => {
  const { id } = useParams();
  const [meditation, setMeditation] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/meditations/${id}/`)
      .then((res) => res.json())
      .then((data) => setMeditation(data))
      .catch((err) => console.error(err));
  }, [id]);

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
    return match ? match[1] : null;
  };

  if (!meditation) return <p className="loading">Завантаження...</p>;

  const videoId = extractYouTubeId(meditation.youtube_url);

  return (
    <div className="meditation-detail">
      <h2>{meditation.title}</h2>
      <p className="description">{meditation.description}</p>
      <div className="info">
        <p><strong>Тривалість:</strong> {Math.floor(meditation.duration / 60)} хв</p>
        <p><strong>Тип:</strong> {meditation.type}</p>
      </div>

      {videoId && (
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
            title={meditation.title}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MeditationDetail;
