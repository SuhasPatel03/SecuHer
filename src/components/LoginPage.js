import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./LoginPage.css";

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞" : "🌙"} {/* Toggle between Sun & Moon Icon */}
      </button>
      
      {/* Dynamic Logo Change */}
      <img 
        src={darkMode ? "login1_white.png" : "login1.png"} 
        alt="Logo" 
        className="logo"
      />

      <h1 className="title">
        <span>S</span>ecu<span>H</span>er
      </h1>

      {/* Redirect to Login Form */}
      <Link to="/login-form" className="btn">Login</Link>
      <Link to="/signup" className="btn">Signup</Link>
    </div>
  );
};

export default LoginPage;
