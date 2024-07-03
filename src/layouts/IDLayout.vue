<template>
  <IDHeader />
  <div class="flex flex-1 h-full">
    <IDSidebar />
    <div class="w-full overflow-hidden">
      <router-view />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDHeader from '@/components/id/IDHeader.vue';
import IDSidebar from '@/components/id/IDSidebar.vue';

export default defineComponent({
  components: {
    IDHeader,
    IDSidebar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const IDStore = useIDStore();
    const needLogin = computed(() => route.meta.needLogin);
    const userId = computed(() => IDStore.token);

    watchEffect(() => {
      if (needLogin.value && !userId.value) {
        router.push({ name: 'IDLogin' });
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
  height: 100%;
  display: flex;
  flex-direction: column;
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
