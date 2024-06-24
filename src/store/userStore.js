import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    id: '',
    type: '',
    isRegistered: true,
    extra: {},
  }),
  actions: {
    init(data) {
      this.accessToken = data.accessToken;
      this.token = data.token;
      this.id = data.id;
      this.type = data.type;
      this.isRegistered = data.isRegistered;
      this.extra = data.extra;
    },
    finRegistered() {
      this.isRegistered = true;
    },
    logout() {
      this.token = '';
      this.id = '';
      this.type = '';
      this.isRegistered = false;
      this.extra = {};
    },
  },
});
