<template>
  <div class="map-container">
    <button class="save-btn" @click="saveLocation">Save My Location</button>
    <button class="locate-btn" @click="locateUser">Locate Me</button>

    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search for a location" />
      <button @click="searchLocation">Search</button>
    </div>

    <div id="map"></div>

    <div v-if="distance" class="distance-info">
      Distance to saved location: <strong>{{ distance.toFixed(2) }} km</strong>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import L from "leaflet";

// Refs
const map = ref(null);
const searchQuery = ref("");
const savedLocation = ref(null);
const distance = ref(null);
const searchResultMarker = ref(null);
const userMarker = ref(null);
const savedMarker = ref(null);
const routeLine = ref(null);

// Custom icons
const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const savedIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const searchIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Save current location
const saveLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      localStorage.setItem("lastLocation", JSON.stringify(locationData));
      savedLocation.value = locationData;

      axios.post("http://localhost:8000/saveLocation.php", locationData)
        .then((res) => alert(res.data.message))
        .catch((err) => console.error("Save error:", err));

      drawSavedMarker();
      updateDistance();
    },
    handleLocationError
  );
};

// Show user's current location
const locateUser = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLatLng = [position.coords.latitude, position.coords.longitude];

      if (userMarker.value) map.value.removeLayer(userMarker.value);
      userMarker.value = L.marker(userLatLng, { icon: userIcon })
        .addTo(map.value)
        .bindPopup("You are here!")
        .openPopup();

      map.value.setView(userLatLng, 14);
      updateDistance();
    },
    handleLocationError
  );
};

// Search for a location
const searchLocation = async () => {
  if (!searchQuery.value.trim()) {
    alert("Please enter a location.");
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}`;

  try {
    const response = await axios.get(url);
    if (response.data.length === 0) {
      alert("No results found.");
      return;
    }

    const { lat, lon } = response.data[0];
    const foundLocation = [parseFloat(lat), parseFloat(lon)];

    if (searchResultMarker.value) {
      map.value.removeLayer(searchResultMarker.value);
    }

    searchResultMarker.value = L.marker(foundLocation, { icon: searchIcon })
      .addTo(map.value)
      .bindPopup(`Search: ${searchQuery.value}`)
      .openPopup();

    map.value.setView(foundLocation, 14);
  } catch (error) {
    console.error("Search error:", error);
    alert("Search failed.");
  }
};

// Update and draw distance + route
const updateDistance = () => {
  if (!navigator.geolocation || !savedLocation.value) return;

  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const savedLat = savedLocation.value.latitude;
    const savedLon = savedLocation.value.longitude;

    // Distance
    const R = 6371;
    const dLat = (savedLat - userLat) * (Math.PI / 180);
    const dLon = (savedLon - userLon) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(userLat * (Math.PI / 180)) * Math.cos(savedLat * (Math.PI / 180)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance.value = R * c;

    // Draw line from user to saved
    const userLatLng = [userLat, userLon];
    const savedLatLng = [savedLat, savedLon];

    if (routeLine.value) map.value.removeLayer(routeLine.value);
    routeLine.value = L.polyline([userLatLng, savedLatLng], {
      color: "blue",
      weight: 4,
      opacity: 0.7,
    }).addTo(map.value);
  }, handleLocationError);
};

// Draw saved location marker
const drawSavedMarker = () => {
  if (savedMarker.value) map.value.removeLayer(savedMarker.value);

  const coords = [savedLocation.value.latitude, savedLocation.value.longitude];
  savedMarker.value = L.marker(coords, { icon: savedIcon })
    .addTo(map.value)
    .bindPopup("Saved Location");
};

// Handle geolocation errors
const handleLocationError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Location permission denied.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location unavailable.");
      break;
    case error.TIMEOUT:
      alert("Location request timed out.");
      break;
    default:
      alert("Unknown location error.");
  }
};

onMounted(() => {
  map.value = L.map("map").setView([52.3676, 4.9041], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  const last = localStorage.getItem("lastLocation");
  if (last) {
    savedLocation.value = JSON.parse(last);
    drawSavedMarker();
    map.value.setView([savedLocation.value.latitude, savedLocation.value.longitude], 14);
  }
});
</script>

<style scoped>
.map-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

#map {
  height: 600px;
  width: 100%;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  margin: 5px;
  padding: 10px 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.save-btn {
  background-color: #007bff;
}

.save-btn:hover {
  background-color: #0056b3;
}

.locate-btn {
  background-color: #28a745;
}

.locate-btn:hover {
  background-color: #1e7e34;
}

.search-container {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-container input {
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-container button {
  background-color: #17a2b8;
}

.search-container button:hover {
  background-color: #138496;
}

.distance-info {
  margin-top: 10px;
  font-size: 16px;
}
</style>













  
