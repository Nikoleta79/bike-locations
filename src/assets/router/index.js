import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../../components/HomePage.vue"; 
import Settings from "../../components/Settings.vue";
import MapPage from "../../components/MapPage.vue";

const routes = [
  {
    path: '/', 
    name: 'HomePage',
    component: HomePage, // Use the new HomePage component
  },
  {
    path: '/mappage',
    name: "MapPage",
    component: MapPage,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;





