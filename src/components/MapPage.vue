<template>
  <div class="map-container">
    <button class="save-btn" @click="saveLocation">Save My Location</button>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import L from "leaflet";

const map = ref(null);

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

      axios
        .post("http://localhost:8000/saveLocation.php", locationData)
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
        })
        .catch((error) => {
          console.error("Error saving location:", error);
        });
    },
    (error) => {
      console.error("Error getting location:", error.message);
      alert("Could not retrieve your location. Please try again.");
    }
  );
};

onMounted(() => {
  map.value = L.map("map", {
    zoomControl: false, // Removes zoom buttons for a cleaner UI
  }).setView([52.3676, 4.9041], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  const lastLocation = localStorage.getItem("lastLocation");
  if (lastLocation) {
    const { latitude, longitude } = JSON.parse(lastLocation);
    const userLocation = [latitude, longitude];

    L.marker(userLocation)
      .addTo(map.value)
      .bindPopup("Your last saved location")
      .openPopup();

    map.value.setView(userLocation, 14);
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [position.coords.latitude, position.coords.longitude];

          const customIcon = L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            iconSize: [30, 30],
          });

          L.marker(userLocation, { icon: customIcon })
            .addTo(map.value)
            .bindPopup("You are here!")
            .openPopup();

          map.value.setView(userLocation, 14);
        },
        () => {
          alert("Could not determine your location.");
        }
      );
    }
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  max-width: 800px; /* Increase max width */
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
  height: 600px; /* Increase height */
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow: hidden;
}


.save-btn {
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

.save-btn:hover {
  background-color: #0056b3;
}
</style>








  
