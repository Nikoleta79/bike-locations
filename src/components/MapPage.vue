<template>
  <div class="map-container">
    <div class="controls">
      <h2>Plan Your Cycling Route</h2>
      <label>From:
        <select v-model="selectedFrom" @change="drawRoute">
          <option disabled value="">Select starting point</option>
          <option value="current">Your current location</option>
          <option value="park">Nearby Park</option>
        </select>
      </label>

      <label>To:
        <select v-model="selectedTo" @change="drawRoute">
          <option disabled value="">Select destination</option>
          <option value="current">Your current location</option>
          <option value="park">Nearby Park</option>
        </select>
      </label>
      <button class="button">
     Locate Me
      </button>
    </div>
    
    <div id="map" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const map = ref(null);
let routingControl = null;

const selectedFrom = ref('');
const selectedTo = ref('');

const userLocation = ref(null);
const parkLocation = ref({
  name: 'Vondelpark',
  coords: [52.357, 4.868],
});

const initMap = () => {
  map.value = L.map('map').setView([52.37, 4.89], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map.value);

  L.marker(parkLocation.value.coords, {
    icon: L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [35, 35],
      iconAnchor: [17, 34],
    }),
  }).addTo(map.value).bindPopup(`${parkLocation.value.name} (Recommended Cycling Spot)`);

  getCurrentLocation();
};

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const latlng = [position.coords.latitude, position.coords.longitude];
    userLocation.value = latlng;

    L.marker(latlng, {
      icon: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
        iconSize: [35, 35],
        iconAnchor: [17, 34],
      }),
    }).addTo(map.value).bindPopup('You are here').openPopup();
  });
};

const drawRoute = () => {
  if (!selectedFrom.value || !selectedTo.value) return;

  let fromCoords, toCoords;

  if (selectedFrom.value === 'current') fromCoords = userLocation.value;
  if (selectedFrom.value === 'park') fromCoords = parkLocation.value.coords;

  if (selectedTo.value === 'current') toCoords = userLocation.value;
  if (selectedTo.value === 'park') toCoords = parkLocation.value.coords;

  if (!fromCoords || !toCoords) return;

  if (routingControl) {
    map.value.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [L.latLng(fromCoords), L.latLng(toCoords)],
    lineOptions: {
      styles: [{ color: '#28a745', weight: 5 }],
    },
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
    routeWhileDragging: false,
  }).addTo(map.value);
};

onMounted(() => {
  initMap();
});
</script>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.controls {
  background: #f8f9fa;
  padding: 15px;
  margin-bottom: 10px;
  width: 90%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.controls h2 {
  margin-bottom: 10px;
}

.controls label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.controls select {
  width: 100%;
  padding: 6px 10px;
  font-size: 16px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.map {
  width: 100%;
  height: 75vh;
  border-radius: 15px;
}

.button{
  background-color: green;
  padding: 15px;
  border-radius: 30px;
  align-content: center;
  margin: auto;
}
</style>














  
