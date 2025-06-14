import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard'; // імпортуємо компонент
import './UsefulArticles.css';

const UsefulArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("усі");

  useEffect(() => {
    axios.get('http://localhost:8000/api/articles/')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Помилка завантаження статей:', error));
  }, []);

  const topics = ["усі", ...new Set(articles.map(article => article.topic))];

  const filteredArticles =
    selectedTopic === "усі"
      ? articles
      : articles.filter(article => article.topic === selectedTopic);

  return (
    <div className="articles-page">
      <div className="articles-container">
        <div className="page-header">
          <h2 className="page-title">Корисні статті</h2>
          <p className="page-description">
            Занурся у світ практичних порад для гармонії, фокусу та внутрішнього балансу.
          </p>
        </div>

        <div className="articles-filters">
          {topics.map((topic, index) => (
            <button
              key={index}
              className={`filter-btn ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </button>
          ))}
        </div>

        <div className="articles-section">
          <h3 className="articles-section-title">Статті за темою: {selectedTopic}</h3>
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsefulArticles;
