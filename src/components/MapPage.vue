<template>
  <div class="map-container">
    <button class="save-btn" @click="saveLocation">Save My Location</button>
    <button class="locate-btn" @click="locateUser">Locate Me</button>
    
    <!-- Search Bar -->
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search for a location" />
      <button @click="searchLocation">Search</button>
    </div>
    
    <div id="map"></div>

    <!-- Distance Info -->
    <div v-if="distance" class="distance-info">
      Distance to saved location: <strong>{{ distance.toFixed(2) }} km</strong>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import L from "leaflet";

const map = ref(null);
const searchQuery = ref("");
const searchResultMarker = ref(null);
const savedLocation = ref(null);
const distance = ref(null);

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
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
        })
        .catch((error) => {
          console.error("Error saving location:", error);
        });

      updateDistance();
    },
    (error) => {
      console.error("Error getting location:", error.message);
      alert("Could not retrieve your location. Please try again.");
    }
  );
};

const locateUser = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];

        map.value.setView(userLocation, 14);
        L.marker(userLocation)
          .addTo(map.value)
          .bindPopup("You are here!")
          .openPopup();

        updateDistance();
      },
      () => {
        alert("Could not retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};

const searchLocation = async () => {
  if (!searchQuery.value) {
    alert("Please enter a location.");
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}`;

  try {
    const response = await axios.get(url);
    if (response.data.length === 0) {
      alert("No results found. Try another search.");
      return;
    }

    const { lat, lon } = response.data[0];
    const foundLocation = [parseFloat(lat), parseFloat(lon)];

    if (searchResultMarker.value) {
      map.value.removeLayer(searchResultMarker.value);
    }

    searchResultMarker.value = L.marker(foundLocation)
      .addTo(map.value)
      .bindPopup(`Result: ${searchQuery.value}`)
      .openPopup();

    map.value.setView(foundLocation, 14);
  } catch (error) {
    console.error("Error fetching location:", error);
    alert("Could not search for the location.");
  }
};

// Calculate the distance between user and saved location
const updateDistance = () => {
  if (!navigator.geolocation || !savedLocation.value) {
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const savedLat = savedLocation.value.latitude;
    const savedLon = savedLocation.value.longitude;

    const R = 6371; // Radius of the Earth in km
    const dLat = (savedLat - userLat) * (Math.PI / 180);
    const dLon = (savedLon - userLon) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLat * (Math.PI / 180)) * Math.cos(savedLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance.value = R * c; // Distance in km
  });
};

onMounted(() => {
  map.value = L.map("map", {
    zoomControl: false,
  }).setView([52.3676, 4.9041], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  const lastLocation = localStorage.getItem("lastLocation");
  if (lastLocation) {
    savedLocation.value = JSON.parse(lastLocation);
    const userLocation = [savedLocation.value.latitude, savedLocation.value.longitude];

    L.marker(userLocation)
      .addTo(map.value)
      .bindPopup("Your last saved location")
      .openPopup();

    map.value.setView(userLocation, 14);
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

#map {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow: hidden;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: 0.3s;
  margin-bottom: 10px;
}

button:hover {
  background-color: #0056b3;
}

.locate-btn {
  background-color: #28a745;
}

.locate-btn:hover {
  background-color: #1e7e34;
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.search-container input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
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
  color: #333;
}
</style>











  
