import React from 'react';
import './WordCloudSection.css'; // підключення CSS

const WordCloudSection = ({ words }) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F06292', '#7986CB', '#9575CD',
    '#64B5F6', '#4DB6AC', '#81C784', '#FFD54F'
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const getFontSize = (count, maxCount) => {
    const minSize = 14;
    const maxSize = 48;
    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  const maxCount = Math.max(...words.map(([_, count]) => count));

  return (
    <div className="word-cloud-container">
      <h3 className="word-cloud-title">Хмара слів за місяць</h3>
      <div className="word-cloud">
        {words.map(([word, count]) => (
          <span
            key={word}
            className="word-cloud-item"
            style={{
              fontSize: `${getFontSize(count, maxCount)}px`,
              color: getRandomColor(),
              opacity: 0.7 + (count / maxCount) * 0.3,
              transform: `rotate(${Math.random() * 10 - 5}deg)`
            }}
            title={`${word}: ${count} разів`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordCloudSection;
