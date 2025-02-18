import React from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SettingsPage.css'; // Import the CSS for styling

const SettingsPage = () => {
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
          <h2>Reset Password</h2>
          <button className="button">Reset</button>
        </div>
        <div className="settings-card">
          <h2>Change Name</h2>
          <input type="text" placeholder="Enter new name" className="input-field" />
          <button className="button">Change Name</button>
        </div>
        <div className="settings-card">
          <h2>Notification Settings</h2>
          <button className="button">Configure</button>
        </div>
        <div className="settings-card">
          <h2>Privacy Settings</h2>
          <button className="button">Configure</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;