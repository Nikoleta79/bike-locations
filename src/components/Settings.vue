<template>
  <div :class="['settings-container', theme]">
    <header class="settings-header">
      <h1>Settings</h1>
    </header>

    <main class="settings-content">
      

      <!-- Theme Selector -->
      <section class="setting-item">
        <label for="theme">Select Theme</label>
        <select id="theme" v-model="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </section>

      <!-- Toggle Location Tracking -->
      <section class="setting-item">
        <label for="location">Enable Location Tracking</label>
        <input type="checkbox" id="location" v-model="locationTracking" />
      </section>

      <button class="save-btn" @click="saveSettings">Save Settings</button>
    </main>

    <footer class="settings-footer">
      <p>Made with ❤️ by Nikoleta</p>
    </footer>
  </div>
</template>

<script setup>

import { ref, watch, onMounted } from "vue";

// Reactive state
const theme = ref("light");

// Load theme from localStorage when the page is loaded
onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  theme.value = savedTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
});

// Save theme to localStorage and apply globally
const saveSettings = () => {
  localStorage.setItem("theme", theme.value);
  document.documentElement.setAttribute("data-theme", theme.value);
};
</script>



<style scoped>
/* Base Styles */
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

/* Light Theme */
.settings-container.light {
  background-color: #ffffff;
  color: #333;
}

/* Dark Theme */
.settings-container.dark {
  background-color: #222;
  color: #fff;
}

/* Header */
.settings-header {
  width: 100%;
  text-align: center;
  padding: 20px;
  background: var(--header-bg, #4caf50);
  color: white;
}

/* Content */
.settings-content {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.setting-item {
  margin-bottom: 15px;
}

.setting-item label {
  display: block;
  margin-bottom: 5px;
}

/* Buttons */
.save-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
}

.save-btn:hover {
  background-color: #45a049;
}


.settings-footer {
  text-align: center;
  margin-top: auto;
  padding: 10px;
}
</style>


  