<template>
  <!-- <AppHeader /> -->
  <router-view />
  <!-- <AppFooter /> -->
</template>
<script>
import { defineComponent, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
// import AppFooter from '@/components/AppFooter.vue';
// import AppHeader from '@/components/AppHeader.vue';

export default defineComponent({
  components: {
    // AppFooter,
    // AppHeader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const needLogin = computed(() => route.meta.needLogin);
    const userId = computed(() => adminStore.token);

    watchEffect(() => {
      if (needLogin.value && !userId.value) {
        router.push({ name: 'adminLogin' });
      }
    });

    return {};
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
