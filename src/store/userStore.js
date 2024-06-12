import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    id: '',
    type: '',
    extra: {},
  }),
  actions: {
    init(data) {
      this.token = data.token;
      this.id = data.id;
      this.type = data.type;
      this.extra = data.extra;
    },
    logout() {
      this.token = '';
      this.id = '';
      this.type = '';
      this.extra = {};
    },
  },
})
