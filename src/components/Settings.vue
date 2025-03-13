<template>
    <div class="settings-container">
      <!-- Header Section -->
      <header class="settings-header">
        <h1>Settings</h1>
      </header>
  
      <!-- Settings Form -->
      <main class="settings-content">
        <section class="setting-item">
          <label for="notification-toggle">Enable Notifications</label>
          <input
            type="checkbox"
            id="notification-toggle"
            v-model="settings.notifications"
          />
        </section>
  
        <section class="setting-item">
          <label for="theme-select">Select Theme</label>
          <select id="theme-select" v-model="settings.theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </section>
  
        <section class="setting-item">
          <label for="location-toggle">Enable Location Tracking</label>
          <input
            type="checkbox"
            id="location-toggle"
            v-model="settings.locationTracking"
          />
        </section>
  
        <button class="save-btn" @click="saveSettings">Save Settings</button>
      </main>
  
      <!-- Footer Section -->
      <footer class="settings-footer">
        <p>Made with ❤️ by Nikoleta</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const settings = ref({
    notifications: false,
    theme: 'light',
    locationTracking: false,
  });
  
  // Function to save settings
  const saveSettings = () => {
    // You could add logic to save these settings to localStorage, an API, etc.
    console.log('Settings Saved:', settings.value);
  };
  </script>
  
  <style scoped>
  .settings-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    color: #333;
    padding: 20px;
    height: 100%;
  }
  
  .settings-header {
    background-color: #4CAF50;
    color: white;
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  
  .settings-content {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .setting-item {
    margin-bottom: 20px;
  }
  
  .setting-item label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .setting-item input,
  .setting-item select {
    padding: 8px;
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .save-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
  }
  
  .save-btn:hover {
    background-color: #45a049;
  }
  
  .settings-footer {
    background-color: #f1f1f1;
    width: 100%;
    text-align: center;
    padding: 10px;
    color: #777;
    margin-top: auto;
  }
  </style>
  