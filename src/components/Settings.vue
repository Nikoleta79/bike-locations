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
const notifications = ref(false);
const theme = ref("light");
const locationTracking = ref(false);

// Load settings from localStorage
onMounted(() => {
  const savedSettings = JSON.parse(localStorage.getItem("userSettings")) || {};
  notifications.value = savedSettings.notifications ?? false;
  theme.value = savedSettings.theme ?? "light";
  locationTracking.value = savedSettings.locationTracking ?? false;
});

// Save settings when updated
const saveSettings = () => {
  localStorage.setItem(
    "userSettings",
    JSON.stringify({
      notifications: notifications.value,
      theme: theme.value,
      locationTracking: locationTracking.value,
    })
  );
  console.log("Settings saved!");
};

// Watch for theme changes & apply instantly
watch(theme, (newTheme) => {
  document.documentElement.setAttribute("data-theme", newTheme);
});
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

/* Footer */
.settings-footer {
  text-align: center;
  margin-top: auto;
  padding: 10px;
}
</style>


  