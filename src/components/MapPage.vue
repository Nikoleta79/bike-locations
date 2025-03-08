<template>
    <div>
      <button @click="saveLocation">Save My Location</button>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  
  const saveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
  
        axios.post("http://localhost:8000/saveLocation.php", locationData)
          .then(response => {
            console.log(response.data);
            alert(response.data.message);
          })
          .catch(error => {
            console.error(error);
          });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  </script>

<script setup>
import HelloWorld from './components/HelloWorld.vue';
import L from "leaflet";
import { onMounted } from "vue";

onMounted(() => {
  // Initialize the map with a default view (Amsterdam)
  const map = L.map("map").setView([52.3676, 4.9041], 13); 

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Geolocation logic
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        
        // Add marker to user's location
        L.marker(userLocation).addTo(map).bindPopup("You are here!").openPopup();
        
        // Center the map on the user's location
        map.setView(userLocation, 14);
      },
      () => {
        // If geolocation fails, you can set the map to a default location
        alert("Could not determine your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <HelloWorld msg="Vite + Vue" />

  <!-- Map container -->
  <div id="map"></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#map {
  width: 100%;
  height: 500px;
}
</style>



  
