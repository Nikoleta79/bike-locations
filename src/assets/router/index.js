import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../../views/HomePage.vue'; // This will be used directly if not lazy-loaded

const routes = [
  {
    path: '/',
    redirect: '/home' // Redirect the root to the /home route
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../../views/HomePage.vue'), // Lazy load the HomePage component
    meta: { requiresAuth: true } // You can use this for authentication guard later
  },

  {
    path: '/mappage',
    name: 'MapPage',
    component: () => import('../../components/MapPage.vue') // Lazy load LoginForm component
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

