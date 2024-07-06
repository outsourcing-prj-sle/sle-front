<template>
  <AdminHeader />
  <div class="flex flex-1 h-full">
    <AdminSidebar />
    <div class="w-full overflow-hidden">
      <router-view />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

export default defineComponent({
  components: {
    AdminHeader,
    AdminSidebar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const needLogin = computed(() => route.meta.needLogin);
    const userId = computed(() => adminStore.token);

    watchEffect(() => {
      console.log(userId.value);
      if (needLogin.value && !userId.value) {
        router.push({ name: 'adminLogin' });
      }
    });

    return {};
  },
});
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

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
