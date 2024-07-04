import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: '',
    id: '',
    name: '',
  }),
  actions: {
    init(data) {
      this.token = '';
      this.id = '';
      this.name = '';
    },
    logout() {
      this.token = '';
      this.id = '';
      this.name = '';
    },
  },
});
