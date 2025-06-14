import React from 'react';
import { Link } from 'react-router-dom';
import './ArticlePage.css';

const ArticleCard = ({ article }) => {
  const imageUrl = article.image?.startsWith('http')
    ? article.image
    : `http://localhost:8000${article.image}`;

  return (
    <div className="article-card">
      <div className="card-image">
        <img src={imageUrl} alt={article.title} />
      </div>
      <div className="card-content">
        <h4 className="card-title">{article.title}</h4>
        <p className="card-description">{article.description}</p>
        <p className="card-source">
          Джерело:{' '}
          <a href={article.source} target="_blank" rel="noopener noreferrer">
            {article.source}
          </a>
        </p>
        <Link to={`/articles/${article.id}`} className="read-more-btn">
          Читати далі →
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
