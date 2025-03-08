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
  
