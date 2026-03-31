import { useEffect, useState } from "react";
import API from "../api/axios";

function KnowledgeBase() {
  const [kbData, setKbData] = useState([]);
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);

  const predefinedQuestions = [
    "reset password",
    "create ticket",
    "check ticket status",
    "contact support"
  ];

  useEffect(() => {
    const fetchKB = async () => {
      try {
        const res = await API.get("kb/");
        setKbData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchKB();
  }, []);

  const handleAsk = () => {
    if (!query) return;

    const found = kbData.find(item =>
      item.question.toLowerCase().includes(query.toLowerCase())
    );

    const answer = found ? found.answer : "Sorry, I don't know this.";

    setChat([...chat, { user: query, bot: answer }]);
    setQuery("");
  };

  const handlePredefined = (question) => {
    const found = kbData.find(item =>
      item.question.toLowerCase().includes(question.toLowerCase())
    );

    const answer = found ? found.answer : "Sorry, I don't know this.";

    setChat([...chat, { user: question, bot: answer }]);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        padding: "10px",
        zIndex: 1000
      }}
    >
      <h4>Help Assistant</h4>

      {/* Predefined */}
      <div>
        {predefinedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handlePredefined(q)}
            style={{
              margin: "3px",
              padding: "4px 8px",
              borderRadius: "15px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div
        style={{
          height: "150px",
          overflowY: "auto",
          border: "1px solid #ddd",
          margin: "8px 0",
          padding: "5px",
          background: "#f9f9f9",
          fontSize: "13px",
          color: "#000"
        }}
      >
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p style={{ color: "#007bff" }}><b>Bot:</b> {c.bot}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask..."
          style={{ flex: 1, padding: "5px", fontSize: "12px" }}
        />
        <button
          onClick={handleAsk}
          style={{
            marginLeft: "5px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "5px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default KnowledgeBase;
