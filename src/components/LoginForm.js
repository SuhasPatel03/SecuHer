import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User ID:", userid, "Password:", password);
    navigate("/home"); // Redirect to dashboard after login
  };

  return (
    <div className={`login-form-container ${darkMode ? "dark" : ""}`}>
      {/* Dark Mode Toggle Button */}
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞" : "🌙"}
      </button>

      <div className="login-form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* User ID Field */}
          <label htmlFor="userid">User ID</label>
          <input 
            type="text" 
            id="userid"
            value={userid} 
            onChange={(e) => setUserid(e.target.value)} 
            required 
            className="login-input-field"
          />

          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="login-input-field"
          />

          <button type="submit" className="btn">Submit</button>
        </form>
        {/* Back to Home Button */}
        <button className="btn back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
