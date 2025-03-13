import { createApp } from 'vue';
import App from './App.vue';
import { IonicVue } from '@ionic/vue';
import router from './assets/router';


import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import i18n from './i18n';

import { createPinia } from 'pinia'; 

const app = createApp(App);
const pinia = createPinia(); 

app.use(IonicVue);
app.use(pinia);
app.use(router); 
app.use(i18n); 
app.mount('#app'); 

