// src/components/SearchResultsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './SearchResultsPage.css';
import MeditationCard from '../pages/Meditations/MeditationCard';
 import ArticleCard from '../pages/UsefulArticles/ArticleCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const typeMap = {
    articles: 'article',
    meditations: 'meditation',
  };

  const normalizeResults = (data) => {
    const mergedResults = [];

    for (const [key, items] of Object.entries(data)) {
      const type = typeMap[key] || key;
      items.forEach(item => {
        mergedResults.push({ ...item, type });
      });
    }

    return mergedResults;
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/search/?q=${query}`);
        const normalized = normalizeResults(res.data);
        setResults(normalized);
      } catch (error) {
        console.error('Помилка пошуку:', error);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="search-results-page">
      <h2>Результати пошуку: "{query}"</h2>
      <div className="results-grid">
        {results.length === 0 ? (
          <p>Нічого не знайдено.</p>
        ) : (
          results.map((item) => {
            switch (item.type) {
                case 'meditation':
                  return (
                    <div className="meditation-card" key={`meditation-${item.id}`}>
                      <MeditationCard meditation={item} />
                    </div>
                  );
                case 'article':
                  return (
                    <div className="article-card" key={`article-${item.id}`}>
                      <ArticleCard article={item} />
                    </div>
                  );
                default:
                  return null;
              }
          })
        )}
      </div>
    </div>
  );
};

export default SearchResults;
