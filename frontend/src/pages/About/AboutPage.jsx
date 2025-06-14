import React from 'react';
import './AboutPage.css';
import articlesImg from '../../assets/images/articles.svg';
import meditationImg from '../../assets/images/meditation.svg';
import diaryImg from '../../assets/images/diary.svg';
import chatbotImg from '../../assets/images/analytics-bro.svg';
import breathImg from '../../assets/images/Breathing.svg';
import logo from '../../assets/images/logo.svg';
    
    const AboutPage = () => {
      return (
        <div className="about-page">
          {/* Hero Section */}
          <section className="about-section hero">
            <img src={logo} alt="Safe Place" className="about-logo" />
            <p>
            <span>Ласкаво просимо!</span> Ми створили цей простір, аби кожна людина мала безпечне місце для відновлення душевної рівноваги, 
              пошуку внутрішніх ресурсів і просто щирої розмови з собою. Тут тебе не засуджують. Тут тебе чують.
            </p>
          </section>
    
          {/* Articles Section */}
          <section className="about-section alt">
            <div className="text">
              <h2>📰 Корисні статті</h2>
              <p>
                Наші автори та психологи дбайливо підбирають статті, які допомагають краще розуміти себе та свої емоції. 
                Від практичних порад до глибоких роздумів про життя — все, що надихає, навчає та підтримує.
              </p>
              <p>
                Знання — це сила, особливо коли мова йде про ментальне здоров'я. Ми перекладаємо на мову просту та людяну складні терміни і поняття.
              </p>
            </div>
            <img src={articlesImg} alt="Articles" />
          </section>
    
          {/* Meditation Section */}
          <section className="about-section">
            <img src={meditationImg} alt="Meditations" />
            <div className="text">
              <h2>🧘‍♀️ Медитації</h2>
              <p>
                Іноді достатньо лише кількох хвилин тиші, аби знайти відповідь на важливе питання. 
                Ми пропонуємо медитації на кожен випадок: для заспокоєння, зосередження чи просто для паузи серед шуму щоденності.
              </p>
              <p>
                Кожна практика — це маленька подорож до себе. Увімкни звук, сядь зручно — і дозволь собі побути.
              </p>
            </div>
          </section>
    
          {/* Breathing Practices */}
          <section className="about-section alt">
            <div className="text">
              <h2>🌬️ Дихальні практики</h2>
              <p>
                Дихання — твоя суперсила. Наші вправи побудовані так, аби допомогти швидко знизити рівень тривоги, 
                покращити концентрацію та відновити контроль над тілом.
              </p>
              <p>
                Коли серце б’ється занадто швидко — дихай з нами. Коли думки розбігаються — зосередься на вдиху. І просто будь тут і зараз.
              </p>
            </div>
            <img src={breathImg} alt="Breathing" />
          </section>
    
          {/* Mood Diary */}
          <section className="about-section">
            <img src={diaryImg} alt="Mood Diary" />
            <div className="text">
              <h2>📔 Щоденник настрою</h2>
              <p>
                Записуючи свої почуття, ти вчишся помічати зміни, розпізнавати тригери й краще розуміти себе. 
                Наш щоденник — це інструмент емоційної гігієни.
              </p>
              <p>
                Ділись тим, що на душі. Система допоможе побачити динаміку твого настрою та навіть підкаже, як покращити самопочуття.
              </p>
            </div>
          </section>
    
          {/* Chatbot */}
          <section className="about-section alt">
            <div className="text">
              <h2>💬 Чат підтримки</h2>
              <p>
                Не завжди є з ким поговорити. Тому ми створили чат-бота, який завжди поруч. 
                Він допоможе в критичний момент, нагадає про дихальні техніки, порадить ресурс чи просто вислухає.
              </p>
              <p>
                Це не заміна терапії, але це — перша допомога, коли вона найпотрібніша. Швидка, доступна й безпечна.
              </p>
            </div>
            <img src={chatbotImg} alt="Chatbot" />
          </section>
    
          {/* Final Call to Action */}
          <section className="about-section end">
            <h2>Ми поруч, коли ти цього потребуєш</h2>
            <p>
              Safe Place — це не просто застосунок. Це команда людей, які дбають про твоє ментальне здоров’я.
              Це набір інструментів, що допоможуть зробити перший крок до себе. І це місце, де можна просто бути.
            </p>
            <p>Ти не один. І ти заслуговуєш на підтримку.</p>
          </section>
        </div>
      );
    };
    
    export default AboutPage;
    