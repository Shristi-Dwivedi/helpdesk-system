import { useEffect, useState } from "react";
import API from "../api/axios";
import KnowledgeBase from "./KnowledgeBase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("accounts/profile/");
        setUser(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to load profile. Please login first.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="page-container">
      <h2>User Profile</h2>

      {error && <p className="error-text">{error}</p>}

      {user && (
        <div className="profile-card">
          <table className="profile-table" border={1} align="center">
            <tr>
              <td><p><strong>ID:</strong> {user.id}</p></td>
              <td><p><strong>Username:</strong> {user.username}</p></td>

              <td><p><strong>Email:</strong> {user.email}</p></td>
              <td><p><strong>Role:</strong> {user.role}</p></td>

              <td><p><strong>Phone:</strong> {user.phone}</p></td>
            </tr>
          </table>
        </div>
      )}
      <KnowledgeBase />

    </div>
  );
}

export default Profile;