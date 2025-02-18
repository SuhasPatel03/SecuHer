import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SOSPage from './components/SOSPage';
import VehicleServicePage from './components/VehicleServicePage';
import TrackMePage from './components/TrackMePage';
import SettingsPage from './components/SettingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sos" element={<SOSPage />} />
        <Route path="/vehicle-service" element={<VehicleServicePage />} />
        <Route path="/track-me" element={<TrackMePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
