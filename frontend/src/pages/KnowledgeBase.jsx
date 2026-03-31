import { useEffect, useState } from "react";
import API from "../api/axios";

function KnowledgeBase() {
  const [kbData, setKbData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchKB();
  }, []);

  const fetchKB = async (query = "") => {
    try {
      const url = query
        ? `kb/kb/?search=${query}`
        : "kb/kb/";

      const res = await API.get(url);
      console.log("KB DATA:", res.data);
      setKbData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchKB(value);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "25px",
        backgroundColor: "#f9fafb",
        borderRadius: "10px",
        border: "1px solid #ddd",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#1f2937" }}>
        Knowledge Base
      </h2>
      
      <input
        type="text"
        placeholder="Search FAQs..."
        value={search}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

      {kbData.length === 0 && (
        <p style={{ color: "#666" }}>No matching FAQs found</p>
      )}

      {kbData.map((item) => (
        <div
          key={item.id}
          style={{
            marginBottom: "18px",
            padding: "18px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          {/* Title */}
          <h3
            style={{
              margin: "0 0 5px 0",
              color: "#111827",
            }}
          >
            {item.title}
          </h3>

          {/* Category */}
          <p
            style={{
              fontSize: "12px",
              color: "#6b7280",
              marginBottom: "10px",
            }}
          >
            Category: {item.category}
          </p>

          {/* Question */}
          <p
            style={{
              fontWeight: "500",
              color: "#1f2937",
              marginBottom: "5px",
            }}
          >
            Q: {item.question}
          </p>

          {/* Answer */}
          <p
            style={{
              color: "#4b5563",
            }}
          >
            A: {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export default KnowledgeBase;