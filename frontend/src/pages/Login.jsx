import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await API.post("accounts/login/", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      setMessage("Login successful.");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h2>Welcome Back</h2>
          <p>
            Login to access your helpdesk dashboard, track complaints, and manage your support activities.
          </p>
        </div>

        <div className="auth-right">
          <h1>Login</h1>

          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}

          <p className="auth-switch">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;