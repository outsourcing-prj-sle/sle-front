import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
  state: () => ({
    popupFlag: false,
    popupReport: '',
  }),
  actions: {
    openPopup() {
      this.popupFlag = false;
      setTimeout(() => {
        this.popupFlag = true;
      }, 250);
    },
    setPopupReportIndex(index) {
      this.popupReport = index;
    },
  },
});
