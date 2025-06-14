// src/components/MeditationCard.jsx
import React from 'react';
import './MeditationCard.css';
import { useNavigate } from 'react-router-dom';

const MeditationCard = ({ meditation }) => {
    const navigate = useNavigate();
  
    const formatDuration = (seconds) => {
      const mins = Math.floor(seconds / 60);
      return `${mins} хв`;
    };
  
    const extractYouTubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
  
    const getYouTubeThumbnail = (url, quality = 'hqdefault') => {
      const videoId = extractYouTubeId(url);
      if (!videoId) return 'https://via.placeholder.com/320x180?text=No+Thumbnail';
      return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    };
  
    const handleClick = () => {
        if (meditation.type === 'breathing') {
          navigate(`/breathing/${meditation.id}`);
        } else {
          navigate(`/meditations/${meditation.id}`);
        }
      };      
  
    const getBreathingImage = () => {
        return meditation.image || '/images/breathing-circle.gif';
      };
  
    return (
      <div className="meditation-card" onClick={handleClick}>
        <div className="meditation-thumbnail">
            {meditation.type === 'breathing' ? (
                <img
                src={getBreathingImage()}
                alt={`Ілюстрація для ${meditation.title}`}
                />
            ) : (
                <img
                src={getYouTubeThumbnail(meditation.youtube_url)}
                alt={`Обкладинка для ${meditation.title}`}
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/320x180?text=No+Thumbnail';
                }}
                />
            )}
            <div className="duration-badge">
                {formatDuration(meditation.duration)}
            </div>
            </div>

        <div className="meditation-info">
          <h4>{meditation.title}</h4>
          <p className="meditation-description">{meditation.description}</p>
          <div className="meditation-meta">
            <span className="meditation-type">{meditation.type}</span>
          </div>
        </div>
      </div>
    );
  };
  
export default MeditationCard;