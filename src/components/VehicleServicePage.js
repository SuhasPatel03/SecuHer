import React from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './VehicleServicePage.css';

const VehicleServicePage = () => {
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
          <h2>Select Service Type</h2>
          <select className="service-type-dropdown">
            <option value="emergency">Emergency Assistance</option>
            <option value="safeRide">Safe Ride Home</option>
          </select>
        </div>
        <div className="settings-card">
          <h2>Additional Message</h2>
          <textarea className="service-message" placeholder="Enter additional details here..."></textarea>
        </div>
        <div className="settings-card">
          <button className="button">Request Service</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleServicePage;
