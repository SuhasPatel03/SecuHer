import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./TrackMePage.css";

const OPEN_CAGE_API_KEY = "5009acb87f44434da19e1f5e0455dfd7"; // Replace with your OpenCage API Key
const OPEN_ROUTER_API_KEY = "5b3ce3597851110001cf6248f406006343db4ac79a5cb328d1bc08d6"; // Replace with your OpenRouter API Key

const TrackMePage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [route, setRoute] = useState([]);

  // Custom marker icons
  const locationIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Get user's current location
  const trackMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  // Convert destination address to coordinates using OpenCage API
  const getDestinationCoordinates = async () => {
    if (!destination) {
      alert("Please enter a destination.");
      return;
    }

    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          q: destination,
          key: OPEN_CAGE_API_KEY,
        },
      });

      const data = response.data;
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setDestinationCoords({ lat, lng });
        getRoute(lat, lng);
      } else {
        alert("Destination not found.");
      }
    } catch (error) {
      console.error("Error fetching destination coordinates:", error);
      alert("Failed to get destination location.");
    }
  };

  // Get route using OpenRouter API
  const getRoute = async (destLat, destLng) => {
    if (!currentLocation) {
      alert("Please track your location first.");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
        {
          coordinates: [[currentLocation.lng, currentLocation.lat], [destLng, destLat]],
        },
        {
          headers: {
            "Authorization": OPEN_ROUTER_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const routeData = response.data.features[0].geometry.coordinates;
      const formattedRoute = routeData.map(coord => ({ lat: coord[1], lng: coord[0] }));
      setRoute(formattedRoute);
    } catch (error) {
      console.error("Error fetching route:", error);
      alert("Failed to get route.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="header-title">
          Secu<span className="violet-h">Her</span>
        </h1>
        <div className="user-info">
          <a href="/profile" className="profile-link">Profile</a>
          <i className="header-icon">🔔</i>
        </div>
      </div>

      <div className="content">
        <h1>TrackMe Page</h1>
        {currentLocation ? (
          <p>Your Location: {currentLocation.lat}, {currentLocation.lng}</p>
        ) : (
          <p>Click below to track your location.</p>
        )}

        <button className="button" onClick={trackMe}>Track Me</button>

        <div>
          <input
            type="text"
            className="destination-input"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button className="find-route-button" onClick={getDestinationCoordinates}>
            Find Route
          </button>
        </div>

        <div className="map-container">
          <MapContainer center={currentLocation || [20, 78]} zoom={6} className="leaflet-container">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Current Location Marker */}
            {currentLocation && (
              <Marker position={[currentLocation.lat, currentLocation.lng]} icon={locationIcon}>
              </Marker>
            )}

            {/* Destination Marker */}
            {destinationCoords && (
              <Marker position={[destinationCoords.lat, destinationCoords.lng]} icon={locationIcon}>
              </Marker>
            )}

            {/* Route Line */}
            {route.length > 0 && <Polyline positions={route} color="blue" />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default TrackMePage;
