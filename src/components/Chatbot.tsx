import React, { useState } from "react";

interface ChatbotProps {
  courseContent: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ courseContent }) => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, marginTop: 32, maxWidth: 400 }}>
      <h2 style={{ fontWeight: "bold", marginBottom: 8 }}>Course Q&A Chatbot</h2>
      <div style={{ minHeight: 120, marginBottom: 12 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div style={{ textAlign: "right", color: "#333" }}><b>You:</b> {msg.user}</div>
            <div style={{ textAlign: "left", color: "#007bff" }}><b>AI:</b> {msg.bot}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this course..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !input.trim()} style={{ padding: "8px 16px", borderRadius: 4, background: "#007bff", color: "#fff", border: "none" }}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
