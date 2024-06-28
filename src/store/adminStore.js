import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: '',
    id: '',
  }),
  actions: {
    init(data) {
      this.token = data.token;
      this.id = data.id;
    },
    logout() {
      this.token = '';
      this.id = '';
    },
  },
});
