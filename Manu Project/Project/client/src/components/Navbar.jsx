import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">SkillProfile</Link>
        <input type="text" placeholder="Search by skill..." className="search-bar" />
      </div>
      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-btn">Profile</Link>
            <button onClick={handleLogout} className="nav-btn logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
