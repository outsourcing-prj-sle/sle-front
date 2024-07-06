import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
  state: () => ({
    popupFlag: false,
  }),
  actions: {
    openPopup() {
      this.popupFlag = false;
      setTimeout(() => {
        this.popupFlag = true;
      }, 250)
    },
  },
});
