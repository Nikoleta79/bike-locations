import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', {
  state: () => ({
    userLocation: null,
  }),
  actions: {
    setLocation(lat, lng) {
      this.userLocation = { lat, lng };
    }
  }
});
