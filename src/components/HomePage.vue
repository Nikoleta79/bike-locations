<template>
    <div class="app-container">
      <!-- Language Switcher -->
      <div class="language-switcher">
        <button @click="changeLanguage('en')">English</button>
        <button @click="changeLanguage('sq')">Shqip</button> 
        <button @click="changeLanguage('nl')">Nederlands</button>
        <button @click="changeLanguage('el')">Ελληνικά</button>
      </div>
  
      <header class="header">
        <h1>{{ $t('welcome') }}</h1>
      </header>
  
      <main class="main-content">
        <section class="hero-section">
          <div class="hero-card">
            <h2>{{ $t('startJourney') }}</h2>
            <p>
              {{ $t('exploreWorld') }}
            </p>
          </div>
        </section>
  
        <section class="action-buttons">
          <router-link to="/mappage" class="btn explore-btn">{{ $t('exploreMap') }}</router-link>
          <router-link to="/settings" class="btn settings-btn">{{ $t('settings') }}</router-link>
        </section>
  
        <section class="features">
          <div class="features-card">
            <h3>{{ $t('keyFeatures') }}</h3>
            <ul>
              <li>{{ $t('interactiveMaps') }}</li>
              <li>{{ $t('trackProgress') }}</li>
              <li>{{ $t('realTimeUpdates') }}</li>
            </ul>
          </div>
        </section>
        <img src="../assets/img/Netherlands.png" alt="biking">
      </main>
  
      <footer>
      <p>Made with ❤️ by Nikoleta</p>
    </footer>
    </div>
  </template>
  
  <script>

import { onMounted } from "vue";

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
});

  export default {
  name: 'HomePage',
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang; // Change the language
      localStorage.setItem('userLanguage', lang); // Save the preference
    },
  },
  mounted() {
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage; // Load the saved preference
    }
  },
};
  </script>
  
  <style scoped>
  html, body {
    height: 100%; 
    margin: 0;
    padding: 0;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    color: #333;
    height: 100%;
    overflow-y: auto; 
  }
  
  header {
    background-color: #4CAF50;
    color: white;
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  
  main {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    box-sizing: border-box;
  }
  
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
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
  }
  
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
  
  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 8px;
    margin-top: 15px; 
    margin-bottom: 30px; 
    display: block; 
    text-align: center; 
  }
  
  footer {
    background-color: #f1f1f1;
    width: 100%;
    text-align: center;
    padding: 10px;
    color: #777;
    margin-top: auto;
    }

    .language-switcher {
  margin: 10px;
  text-align: right;
}

.language-switcher button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

.language-switcher button:hover {
  background-color: #45a049;
}
  </style>