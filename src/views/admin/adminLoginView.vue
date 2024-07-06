<template>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md content-center p-8 space-y-8 min-h-[350px] bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2"
      style="transform: translate(-50%, -50%)"
    >
      <div class="flex justify-center mb-4">
        <img src="@/assets/img/logo_sel.png" alt="Logo" class="h-24" />
      </div>
      <div class="text-2xl font-semibold">관리자 로그인</div>
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >아이디</label
          >
          <input
            type="text"
            id="email"
            v-model="email"
            required
            class="w-full px-3 py-2 mt-1 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >비밀번호</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-3 py-2 mt-1 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
      <div class="flex items-center justify-between mt-6">
        <button
          @click="submitLogin"
          type="submit"
          class="w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded hover:opacity-80 focus:outline-none"
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
  name: 'adminLoginView',
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const email = ref('');
    const password = ref('');

    const submitLogin = async () => {
      if (!email.value) {
        alert('아이디를 입력해주세요');
      }
      if (!password.value) {
        alert('비밀번호를 입력해주세요');
      }

      const loginResponse = await AdminService.login({
        id: email.value,
        password: password.value,
      });
      const resData = loginResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }
      if (!resData.token) {
        alert('아이디, 비밀번호를 확인해주세요');
        return;
      }

      console.log(resData);

      adminStore.init({
        token: resData.token,
        id: resData.id,
        name: resData.name || '이름',
      });

      const redirectPath = route.query.redirect || '/admin/site';
      router.push(redirectPath);
    };
    return {
      email,
      password,
      submitLogin,
    };
  },
};
</script>

<style scoped></style>
