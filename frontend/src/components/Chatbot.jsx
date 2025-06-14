import "./Chatbot.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Привіт! Чим можу допомогти?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await new Promise((resolve) => {
        setTimeout(async () => {
          const res = await axios.post("http://127.0.0.1:8000/api/chat/", { message: input });
          resolve(res);
        }, 2000); // симуляція затримки для анімації друкування
      });

      const botMessage = {
        text: response.data.response,
        sender: "bot",
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "Помилка з'єднання з сервером.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <h2>Чат підтримки</h2>
          <button onClick={onClose} className="chatbot-close-button">✕</button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-message ${msg.sender}`}>
              <div className={`chatbot-bubble ${msg.sender}`}>
              {msg.sender === "bot" && msg.text ? (
                (() => {
                  const lines = msg.text.split("\n").filter(Boolean);

                  const isNumberedList = lines.every(line => /^\d+\.\s/.test(line));
                  if (isNumberedList) {
                    return (
                      <ol style={{ paddingLeft: "1.25rem", margin: "0.25rem 0" }}>
                        {lines.map((line, i) => (
                          <li key={i} style={{ marginBottom: "0.25rem" }}>
                            {line.replace(/^\d+\.\s/, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  } else {
                    return lines.map((line, i) => <p key={i}>{line}</p>);
                  }
                })()
              ) : (
                msg.text || ""
              )}

              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-message bot">
              <div className="chatbot-bubble bot typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input-area">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            className="chatbot-input"
            placeholder="Напиши щось..."
          />
          <button onClick={handleSend} className="chatbot-send-button">
            Надіслати
          </button>
        </div>
      </div>
    </div>
  );
}
