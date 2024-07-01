<template>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md content-center p-8 space-y-8 min-h-[350px] bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2"
      style="transform: translate(-50%, -50%)"
    >
      <div class="flex justify-center mb-[60px]">
        <img src="@/assets/img/logo_sel.png" alt="Logo" class="h-24" />
      </div>
      <div class="text-2xl font-semibold">관리자 로그인</div>

      <div class="flex items-center justify-center">
        <button
          @click="submitLogin"
          type="submit"
          class="w-[230px] text-center items-center flex justify-center px-4 py-2 text-base font-medium text-white bg-gray-600 rounded hover:opacity-80 focus:outline-none"
        >
          관리자 로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';

export default {
  name: 'adminSiteView',
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const email = ref('');
    const password = ref('');

    return {
      email,
      password,
    };
  },
};
</script>

<style scoped></style>
