import { useEffect, useState } from "react";
import API from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

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
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;