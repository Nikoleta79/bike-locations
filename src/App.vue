<template>
  <div class="app-container">
    <!-- Header Section -->
    <header class="header">
      <h1>Welcome bike track location</h1>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-card">
          <h2>Start Your Journey</h2>
          <p>
            Explore the world with the app! Discover amazing locations, track your progress, and more.
          </p>
        </div>
      </section>

      <!-- Buttons Section -->
      <section class="action-buttons">
        <button class="btn explore-btn" @click="goToMapPage">Explore Map</button>
        <button class="btn settings-btn" @click="goToSettings">Settings</button>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="features-card">
          <h3>Key Features</h3>
          <ul>
            <li>Interactive Maps</li>
            <li>Track Progress</li>
            <li>Real-Time Updates</li>
          </ul>
        </div>
      </section>
      <img src="./assets/img/Netherlands.png" alt="biking">
    </main>

 
    <!-- Footer Section -->
    <footer class="footer">
      <p>Made with ❤️ by Nikoleta</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Function to navigate to the MapPage
const goToMapPage = () => {
  router.push('/mappage');
};

// Function to navigate to the Settings page
const goToSettings = () => {
  router.push('/settings');
};
</script>

<style scoped>

html, body {
  height: 100%; /* Ensure full height for scrolling */
  margin: 0;
  padding: 0;
  
}


/* App container layout */
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  color: #333;
  height: 100%;
  overflow-y: auto; /* Enable scrolling */
}

/* Header styles */
header {
  background-color: #4CAF50;
  color: white;
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

/* Main content */
main {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
}

/* Hero Section */
.hero-section {
  margin-bottom: 30px;
}

.hero-card {
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Buttons Section */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

/* Button Styles */
.btn {
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.explore-btn {
  background-color: #4CAF50;
}

.explore-btn:hover {
  background-color: #45a049;
}

.settings-btn {
  background-color: #FF9800;
}

.settings-btn:hover {
  background-color: #f57c00;
}

/* Features Section */
.features {
  margin-top: 30px;
}

.features-card {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 10px 0;
}

/* Image Styles */
img {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  margin-top: 15px; /* Add space above the image */
  margin-bottom: 30px; /* Add space below the image */
  display: block; /* To ensure the image takes its own line */
  text-align: center; /* Center the image horizontally */
}


/* Footer Styles */
footer {
  background-color: #f1f1f1;
  width: 100%;
  text-align: center;
  padding: 10px;
  color: #777;
  margin-top: auto;
}

</style>

