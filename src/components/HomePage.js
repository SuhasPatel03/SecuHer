import React from "react";
import { FaBell, FaCar, FaMapMarkerAlt, FaRing } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS for styling

const HomePage = () => {
  return (
    <div className="container">
      {/* App Header */}
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/Secuher.jpg`} alt="Secuher" className="secuher-image" />
        <h1>Secu<span className="violet-h">H</span>er</h1>
        <div className="user-info">
          <Link to="/profile" className="profile-link">Profile</Link>
          <FaBell className="header-icon" />
        </div>
      </header>

      {/* Features Grid */}
      <div className="features-grid">
        <Link to="/sos" className="feature-link">
          <FeatureCard icon={<FaBell />} title="SOS" description="Emergency alerts sent instantly." />
        </Link>
        <Link to="/vehicle-service" className="feature-link">
          <FeatureCard icon={<FaCar />} title="Vehicle Service" description="Get a safe escort home." />
        </Link>
        <Link to="/track-me" className="feature-link">
          <FeatureCard icon={<FaMapMarkerAlt />} title="TrackMe" description="Keep your location tracked." />
        </Link>
        <Link to="/settings" className="feature-link">
          <FeatureCard icon={<FaRing />} title="Settings" description="Configure your security settings." />
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default HomePage;
