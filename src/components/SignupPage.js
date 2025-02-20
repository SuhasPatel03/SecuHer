import React, { useState } from "react";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        contact: '',
        emergency1: '',
        emergency2: '',
        emergency3: '',
        password: '',
        confirmPassword: ''
    });

    const [darkMode, setDarkMode] = useState(false);
    const [error, setError] = useState(""); // Error message for password mismatch
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate password
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError(""); // Clear any previous errors
        console.log("Signup Data:", formData);
        alert("Signup successful!");
        navigate("/home"); // Redirect to HomePage after signup
    };

    const handleBackToLogin = () => {
        navigate("/"); // Redirect to LoginPage.js
    };

    return (
        <div className={`signup-container ${darkMode ? "dark" : ""}`}>
            <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "🌞" : "🌙"}
            </button>

            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="userId">User ID</label>
                    <input type="text" name="userId" id="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} required />

                    <label htmlFor="contact">Contact Number</label>
                    <input type="tel" name="contact" id="contact" placeholder="+91 Contact Number" value={formData.contact} onChange={handleChange} required />

                    <label htmlFor="emergency1">Emergency Contact 1</label>
                    <input type="tel" name="emergency1" id="emergency1" placeholder="Emergency Contact 1" value={formData.emergency1} onChange={handleChange} required />

                    <label htmlFor="emergency2">Emergency Contact 2</label>
                    <input type="tel" name="emergency2" id="emergency2" placeholder="Emergency Contact 2" value={formData.emergency2} onChange={handleChange} required />

                    <label htmlFor="emergency3">Emergency Contact 3</label>
                    <input type="tel" name="emergency3" id="emergency3" placeholder="Emergency Contact 3" value={formData.emergency3} onChange={handleChange} required />

                    {/* Password Field */}
                    <label htmlFor="password">Create Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

                    {/* Show password mismatch error */}
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn">Sign Up</button>
                    <button type="button" className="btn secondary" onClick={handleBackToLogin}>Back to Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
