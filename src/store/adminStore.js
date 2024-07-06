import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: '',
    id: '',
    name: '',
  }),
  actions: {
    init(data) {
      this.token = data.token;
      this.id = data.id;
      this.name = data.name;
    },
    logout() {
      this.token = '';
      this.id = '';
      this.name = '';
    },
  },
});
