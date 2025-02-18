import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./TrackMePage.css";

const OPEN_CAGE_API_KEY = "5009acb87f44434da19e1f5e0455dfd7";
const OPEN_ROUTER_API_KEY = "5b3ce3597851110001cf6248f406006343db4ac79a5cb328d1bc08d6";

const TrackMePage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [moving, setMoving] = useState(false);
  const [movingIndex, setMovingIndex] = useState(0);
  const [sosPopup, setSosPopup] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [sosTimeoutId, setSosTimeoutId] = useState(null);

  const locationIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

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

  const getDestinationCoordinates = async () => {
    if (!destination) {
      alert("Please enter a destination.");
      return;
    }

    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: { q: destination, key: OPEN_CAGE_API_KEY },
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

  const getRoute = async (destLat, destLng) => {
    if (!currentLocation) {
      alert("Please track your location first.");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
        { coordinates: [[currentLocation.lng, currentLocation.lat], [destLng, destLat]] },
        { headers: { "Authorization": OPEN_ROUTER_API_KEY, "Content-Type": "application/json" } }
      );

      const routeData = response.data.features[0].geometry.coordinates;
      const formattedRoute = routeData.map(coord => ({ lat: coord[1], lng: coord[0] }));
      setRoute(formattedRoute);
      setMovingIndex(0);
      setMoving(false);
    } catch (error) {
      console.error("Error fetching route:", error);
      alert("Failed to get route.");
    }
  };

  const startMoving = () => {
    if (route.length === 0) {
      alert("No route found. Please get a route first.");
      return;
    }

    setMoving(true);
    let index = 0;
    let stopDuration = 0;
    let totalStopTime = 0;

    const interval = setInterval(() => {
      if (index >= route.length) {
        clearInterval(interval);
        setMoving(false);
        alert("You have reached your destination!");
        return;
      }

      if (Math.random() < 0.1 && stopDuration === 0) {
        stopDuration = Math.floor(Math.random() * 26) + 5; // Stop for random time between 5 and 30 sec
        totalStopTime = 0;
      }

      if (stopDuration > 0) {
        stopDuration--;
        totalStopTime++;

        if (totalStopTime > 15 && !sosTriggered && !alertSent) {
          setSosPopup(true);
          setSosTriggered(true);

          const timeoutId = setTimeout(() => {
            sendAlert();
          }, 5000); // Auto send SOS if no response in 5 sec

          setSosTimeoutId(timeoutId);
        }

        return;
      }

      if (sosTimeoutId) {
        clearTimeout(sosTimeoutId);
        setSosTimeoutId(null);
      }

      const deviation = Math.random() < 0.1 ? 0.0005 : 0;
      const nextLocation = {
        lat: route[index].lat + deviation,
        lng: route[index].lng + deviation,
      };

      setMovingIndex(index);
      setCurrentLocation(nextLocation);
      index++;
    }, 1000);
  };

  const sendAlert = () => {
    if (!alertSent) {
      setAlertSent(true);
      setSosPopup(false);
      alert("SOS Sent!");
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
        {currentLocation ? <p>Your Location: {currentLocation.lat}, {currentLocation.lng}</p> : <p>Click below to track your location.</p>}

        <button className="button" onClick={trackMe}>Track Me</button>

        <div>
          <input type="text" className="destination-input" placeholder="Enter destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <button className="find-route-button" onClick={getDestinationCoordinates}>Find Route</button>
        </div>

        <div className="map-container">
          <MapContainer center={currentLocation || [20, 78]} zoom={6} className="leaflet-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />

            {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lng]} icon={locationIcon}></Marker>}
            {destinationCoords && <Marker position={[destinationCoords.lat, destinationCoords.lng]} icon={locationIcon}></Marker>}
            {route.length > 0 && <Polyline positions={route} color="blue" />}
          </MapContainer>
        </div>

        {route.length > 0 && !moving && <button className="start-button" onClick={startMoving}>Start</button>}

        {sosPopup && !alertSent && (
          <div className="sos-popup">
            <p>Do you want to send an SOS message?</p>
            <button className="sos-yes" onClick={sendAlert}>Yes</button>
            <button className="sos-no" onClick={() => setSosPopup(false)}>No</button>
          </div>
        )}

        {alertSent && <p className="alert-message">THE ALERT HAS BEEN SENT</p>}
      </div>
    </div>
  );
};

export default TrackMePage;
