import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_URL = "http://localhost:8080/api/chat";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! 👋 I'm Tomato Support AI. How can I help you with your food order?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: "user", text: message }
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: message
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const reply = await response.text();

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: reply || "Sorry, I couldn't generate a response."
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "error",
          text: "Unable to connect to Tomato Support. Please make sure the Spring Boot backend is running on port 8080."
        }
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const newChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text: "New chat started. 👋 How can I help you with your food order?"
      }
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🍅</div>
          <div>
            <h1>Tomato</h1>
            <span>AI Support</span>
          </div>
        </div>

        <button className="new-chat" onClick={newChat}>
          <span>＋</span> New chat
        </button>

        <div className="sidebar-info">
          <div className="status-dot"></div>
          <div>
            <strong>Support AI</strong>
            <p>Available to help</p>
          </div>
        </div>

        <div className="sidebar-footer">
          <span>Food ordering support</span>
          <span>AI powered</span>
        </div>
      </aside>

      <main className="chat">
        <header className="chat-header">
          <div className="mobile-brand">
            <div className="brand-icon small">🍅</div>
            <div>
              <strong>Tomato Support</strong>
              <span>AI Assistant</span>
            </div>
          </div>

          <div className="online">
            <span className="online-dot"></span>
            Online
          </div>
        </header>

        <section className="messages">
          <div className="welcome">
            <div className="welcome-icon">🍅</div>
            <h2>How can we help?</h2>
            <p>Ask about your order, refund, tracking, or Tomato policies.</p>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${message.role}`}
            >
              {message.role !== "user" && (
                <div className="avatar">
                  {message.role === "error" ? "!" : "🍅"}
                </div>
              )}

              <div className="message-content">
                <div className="message-label">
                  {message.role === "user"
                    ? "You"
                    : message.role === "error"
                    ? "Connection"
                    : "Tomato AI"}
                </div>
                <div className="bubble">{message.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row assistant">
              <div className="avatar">🍅</div>
              <div className="message-content">
                <div className="message-label">Tomato AI</div>
                <div className="bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        <footer className="composer-area">
          <div className="composer">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Tomato Support..."
              rows="1"
              disabled={loading}
            />
            <button
              className="send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
          <p className="hint">Enter to send · Shift + Enter for a new line</p>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);