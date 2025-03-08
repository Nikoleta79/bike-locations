import { createApp } from 'vue';
import App from './App.vue';
import { IonicVue } from '@ionic/vue';
import router from './assets/router';

// Import Ionic CSS
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

const app = createApp(App);
const pinia = createPinia();

app.use(IonicVue);
app.use(pinia);
app.use(router);
app.mount('#app');
app.use(router);

