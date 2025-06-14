import React from 'react';
import './ArticlesPreview.css';
import articlesprev from '../../assets/images/articles.svg';

const ArticlesPreview = ({ onNavigate }) => {
  return (
    <div className="articles-preview">
      <div className="articles-preview-left">
        <h3>Відкрий світ знань про себе</h3>
        <p>
          Збірка статей, які допоможуть краще зрозуміти свій емоційний стан, подолати стрес,
          покращити сон та розвинути навички самодопомоги.
        </p>
        <ul>
          <li>Корисні техніки та практики</li>
          <li>Поради від психологів</li>
          <li>Інтерактивний формат з візуалізацією</li>
        </ul>
        <button className="go-to-articles-btn" onClick={onNavigate}>
          Перейти
        </button>
      </div>
      <div className="articles-preview-right">
        <img src={articlesprev} alt="Articles visual" />
      </div>
    </div>
  );
};

export default ArticlesPreview;
