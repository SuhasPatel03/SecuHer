import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import custom marker images
import userMarkerIcon from '../assets/user-marker.png';  // Replace with your actual marker image
import destinationMarkerIcon from '../assets/destination-marker.png';

// Define custom icons
const userIcon = new L.Icon({
  iconUrl: userMarkerIcon,
  iconSize: [40, 40], // Adjust size as needed
  iconAnchor: [20, 40], // Positioning of the icon
  popupAnchor: [0, -40], // Position of the popup relative to the icon
});

const destinationIcon = new L.Icon({
  iconUrl: destinationMarkerIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const MapComponent = ({ location, destination, route }) => {
  return (
    <MapContainer center={[location.lat, location.lng]} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User Location Marker */}
      <Marker position={[location.lat, location.lng]} icon={userIcon}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* Destination Marker */}
      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}

      {/* Route Path */}
      {route && <Polyline positions={route.coordinates} color="blue" />}
    </MapContainer>
  );
};

export default MapComponent;
