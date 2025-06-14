import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';
import './ArticlePage.css';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${id}/`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading article:', error);
        setLoading(false);
      });
  }, [id]);

  const cleanHTML = (rawHtml) => {
    if (!rawHtml) return '';
    
    const purified = DOMPurify.sanitize(rawHtml, {
      FORBID_ATTR: ['style'],
      ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'blockquote'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class']
    });

    return purified
      .replace(/<p>(&nbsp;|\s|<br\s*\/?>)*<\/p>/gi, '')
      .replace(/<br\s*\/?>/gi, '');
  };

  if (loading) {
    return <div className="article-loading">Завантаження...</div>;
  }

  if (!article) {
    return <div className="article-error">Статтю не знайдено</div>;
  }

  return (
    <div className="article-detail">
      <div className="article-header">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="topic">{article.topic}</span>
          {article.source && (
            <span className="source">
              Джерело: {article.url ? (
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.source}
                </a>
              ) : article.source}
            </span>
          )}
          <span className="date">
            {new Date(article.added_at).toLocaleDateString('uk-UA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {article.image && (
        <div className="article-image-wrapper">
          <img
            className="article-image"
            src={article.image?.startsWith('http') ? article.image : `http://localhost:8000${article.image}`}
            alt={article.title}
          />
        </div>
      )}

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: cleanHTML(article.content) }}
      />

      <Link to="/articles" className="back-link">← Назад до всіх статей</Link>
    </div>
  );
};

export default ArticlePage;