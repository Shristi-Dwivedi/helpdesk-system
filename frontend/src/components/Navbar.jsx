import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">HelpDesk System</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {!token && <Link to="/register">Register</Link>}
        {!token && <Link to="/login">Login</Link>}

        {token && <Link to="/profile">Profile</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}

        {token && <Link to="/tickets">Tickets</Link>}
      </div>
    </nav>
  );
}

export default Navbar;