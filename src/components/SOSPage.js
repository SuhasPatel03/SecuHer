// src/components/SOSPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import './SOSPage.css';

const SOSPage = () => {
  return (
    <div className="container">
             {/* App Header */}
             <header className="header">
               
               <img src={`${process.env.PUBLIC_URL}/Secuher.jpg`} alt="Secuher" className="secuher-image" />
               <Link to="/" className="header-link">
                 <h1>Secu<span className="violet-h">H</span>er</h1>
               </Link>
               <div className="user-info">
                 <Link to="/profile" className="profile-link">Profile</Link>
                 <FaBell className="header-icon" />
               </div>
             </header>
      <div className="settings-grid">
        <div className="settings-card">
          <h2>Select Alert Type</h2>
          <select className="alert-type-dropdown">
            <option value="medical">Medical Emergency</option>
            <option value="fire">Fire Emergency</option>
            <option value="police">Police Assistance</option>
          </select>
        </div>
        <div className="settings-card">
          <h2>Additional Message</h2>
          <textarea className="alert-message" placeholder="Enter additional details here..."></textarea>
        </div>
        <div className="settings-card">
          <button className="button">Send SOS Alert</button>
        </div>
      </div>
    </div>
  );


};

export default SOSPage;
