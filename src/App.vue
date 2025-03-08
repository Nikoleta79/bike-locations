<template>
  <ion-app :class="{ 'dark': themeStore.darkMode }">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const themeStore = useThemeStore();
const authStore = useAuthStore();

const currentNavigation = ref('mainContent');
provide('navigationState', {
  currentPage: currentNavigation,
  setCurrentPage: (page: string) => {
    currentNavigation.value = page;
  }
});

onMounted(() => {
  authStore.loadUserFromStorage();
});
</script>

<style>

.dark {
  --ion-color-primary: #428cff;
  --ion-color-primary-rgb: 66,140,255;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255,255,255;
  --ion-color-primary-shade: #3a7be0;
  --ion-color-primary-tint: #5598ff;

  --ion-background-color: #121212;
  --ion-background-color-rgb: 18,18,18;
  --ion-text-color: #ffffff;
  --ion-text-color-rgb: 255,255,255;
  --ion-border-color: #222222;

  --ion-item-background: #1e1e1e;
  --ion-toolbar-background: #1f1f1f;
  --ion-tab-bar-background: #1f1f1f;
  --ion-card-background: #1e1e1e;
}
</style>


