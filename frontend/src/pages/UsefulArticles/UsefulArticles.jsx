import React, { useEffect, useState } from 'react';
import './UsefulArticles.css';

const UsefulArticles = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const textLines = [
      "Сон",
      "Релаксація",
      "Стрес",
      "Фокус",
      "Емоції",
      "Баланс"
    ];

    let iSpeed = 100;
    let iIndex = 0;
    let iArrLength = textLines[0].length;
    let iScrollAt = 20;
    let iTextPos = 0;
    let sContents = '';
    let iRow;
    const destination = document.getElementById("typedtext");

    function typewriter() {
      sContents = ' ';
      iRow = Math.max(0, iIndex - iScrollAt);
      while (iRow < iIndex) {
        sContents += textLines[iRow++] + '<br />';
      }
      if (destination) {
        destination.innerHTML =
          sContents + textLines[iIndex].substring(0, iTextPos) + "_";
      }

      if (iTextPos++ === iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex !== textLines.length) {
          iArrLength = textLines[iIndex].length;
          setTimeout(typewriter, 500);
        }
      } else {
        setTimeout(typewriter, iSpeed);
      }
    }

    typewriter();
  }, []);

  return (
    <div className="articles-page">
      <div className="articles-container">
        <div className={`page-header ${isHovered ? 'hovered' : ''}`}>
          <h2 className="page-title">Корисні статті</h2>
          <p className="page-description">
            Занурся у світ практичних порад для гармонії, фокусу та внутрішнього балансу.
          </p>
        </div>

        <div 
          className="book"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="book-inner">
            <div className="back"></div>
            <div className="page6">
              <div className="page-content">
                <div id="typedtext"></div>
              </div>
            </div>
            <div className="page5"></div>
            <div className="page4"></div>
            <div className="page3"></div>
            <div className="page2"></div>
            <div className="page1"></div>
            <div className="front">
              <div className="cover-title">
                <h1>Сторінки спокою</h1>
                <p>Твоє ментальне меню</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="articles-section">
  <h3 className="articles-section-title">Статті за обраною темою</h3>
  <div className="articles-grid">
    {[
      {
        title: "Ритуал перед сном",
        description: "Прості дії перед сном, які допоможуть заспокоїти розум.",
        image: "/images/sleep-ritual.jpg"
      },
      {
        title: "Техніка дихання “4-7-8”",
        description: "Дихальна вправа для швидкого заспокоєння та засинання.",
        image: "/images/breathing.jpg"
      },
      {
        title: "Сила режиму сну",
        description: "Чому важливо прокидатися у той самий час кожного дня.",
        image: "/images/sleep-schedule.jpg"
      }
    ].map((article, index) => (
      <div className="article-card" key={index}>
        <div className="card-image">
          <img src={article.image} alt={article.title} />
        </div>
        <div className="card-content">
          <h4 className="card-title">{article.title}</h4>
          <p className="card-description">{article.description}</p>
          <button className="read-more-btn">Читати далі</button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default UsefulArticles;