import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      if (!token) {
        setRole("");
        return;
      }

      try {
        const res = await API.get("accounts/profile/");
        setRole(res.data.role);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRole();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1f2937",
        padding: "15px 30px",
      }}
    >
      <div style={{ color: "white", fontSize: "22px", fontWeight: "bold" }}>
        HelpDesk System
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>

        {!token && <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>}
        {!token && <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>}

        {token && <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>}
        {token && <Link to="/tickets" style={{ color: "white", textDecoration: "none" }}>Tickets</Link>}
        {token && role === "admin" && (
          <Link to="/analytics" style={{ color: "white", textDecoration: "none" }}>
            Analytics
          </Link>
        )}

        {token && (
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 14px",
              border: "none",
              background: "#dc2626",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;