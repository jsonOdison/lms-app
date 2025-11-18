import React, { useState } from "react";
import { GREETINGS } from "@/src/constants/chatbot";
import styles from "./Chatbot.module.css";

interface ChatbotProps {
  courseContent: string;
}

const getRandomGreeting = () => {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
};

const Chatbot: React.FC<ChatbotProps> = ({ courseContent }) => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([
    { user: "", bot: getRandomGreeting() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { user: userMessage, bot: "..." }]);
    try {
      // Simulate AI response (replace with actual API call)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage, context: courseContent }),
      });
      const data = await response.json();
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot = data.answer;
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot = "Sorry, something went wrong.";
        return updated;
      });
    }
    setLoading(false);
  };

  return (
    <div
      className={`${styles.chatbotContainer} ${minimized ? 'p-2 px-6' : 'p-6'}`}
    >
      <div className={styles.header}>
        <h2 className={minimized ? '' : 'mb-2'}>Course Q&A Chatbot</h2>
        <button
          onClick={() => setMinimized((m) => !m)}
          className="bg-transparent border-none text-blue-600 text-xl cursor-pointer ml-2 p-0"
          aria-label={minimized ? "Open chat" : "Minimize chat"}
        >
          {minimized ? "🗨️" : "—"}
        </button>
      </div>
      {!minimized && (
        <>
          <div className={styles.chatWindow}>
            {messages.slice(-10).map((msg, idx) => (
              <div key={idx} className={styles.message}>
                {msg.user ? (
                  <div className="text-right">
                    <span className={styles.userMessage}>
                      <b>You:</b> {msg.user}
                    </span>
                  </div>
                ) : null}
                <div className="text-left mt-1">
                  <span className={styles.botMessage}>
                    <b>AI:</b> {msg.bot}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this course..."
              className={styles.input}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={styles.button}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
