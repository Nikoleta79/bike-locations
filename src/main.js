import { createApp } from 'vue';
import App from './App.vue';
import { IonicVue } from '@ionic/vue';
import router from './assets/router'; // Import the router

// Import Ionic CSS
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

import { createPinia } from 'pinia'; // Make sure you import Pinia correctly

const app = createApp(App);
const pinia = createPinia(); // Create a Pinia store

app.use(IonicVue);
app.use(pinia);
app.use(router); // Use the router once
app.mount('#app'); // Mount the app to the DOM

