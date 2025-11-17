import React, { useState } from "react";

interface ChatbotProps {
  courseContent: string;
}

const GREETINGS = [
  "Hi there! What would you like to know about this course?",
  "Welcome! Ask me anything about the course content.",
  "Hello! Curious about something in this course?",
  "Hey! Ready to learn? Ask your questions.",
  "Greetings! Need help with a topic?",
  "Hi! I'm here to answer your course questions.",
  "Welcome to the course Q&A! What can I help you with?",
  "Hello! Feel free to ask about any topic.",
  "Hey there! Got a question about the course?",
  "Hi! Let's make learning easy. Ask away!",
  "Welcome! Your course questions are just a message away.",
];

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
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 1000,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        border: "1px solid #e5e7eb",
        padding: minimized ? "8px 24px" : 24,
        maxWidth: 380,
        width: "100%",
        minWidth: 320,
        transition: "box-shadow 0.2s, padding 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.16)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)")}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontWeight: "bold", marginBottom: minimized ? 0 : 8, color: "#007bff", fontSize: 20 }}>Course Q&A Chatbot</h2>
        <button
          onClick={() => setMinimized((m) => !m)}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            color: "#007bff",
            cursor: "pointer",
            marginLeft: 8,
            lineHeight: 1,
            padding: 0,
          }}
          aria-label={minimized ? "Open chat" : "Minimize chat"}
        >
          {minimized ? "🗨️" : "—"}
        </button>
      </div>
      {!minimized && (
        <>
          <div
            style={{
              minHeight: 120,
              maxHeight: "18em",
              marginBottom: 12,
              background: "#f5f8fa",
              borderRadius: 8,
              padding: 10,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.slice(-10).map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 10 }}>
                {msg.user ? (
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#e3f2fd",
                        color: "#007bff",
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontWeight: 500,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                      }}
                    >
                      <b>You:</b> {msg.user}
                    </span>
                  </div>
                ) : null}
                <div style={{ textAlign: "left", marginTop: 4 }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#e8f5e9",
                      color: "#388e3c",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontWeight: 500,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    }}
                  >
                    <b>AI:</b> {msg.bot}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this course..."
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                outline: "none",
                fontSize: 16,
                background: "#f5f8fa",
                transition: "border-color 0.2s",
              }}
              disabled={loading}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#007bff")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                background: loading ? "#90caf9" : "#007bff",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "background 0.2s, box-shadow 0.2s",
              }}
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
