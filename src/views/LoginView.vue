<template>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2"
      style="transform: translate(-50%, -50%)"
    >
      <div class="flex justify-center">
        <img src="@/assets/img/logo_sel.png" alt="Logo" class="h-24" />
      </div>
      <form @submit.prevent="handleSubmit">
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
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
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
            type="submit"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            로그인
          </button>
        </div>
      </form>

      <div class="text-center">
        <button
          class="text-sm text-blue-500 hover:underline"
          @click="methods_naverLogin"
        >
          웨일스페이스 로그인
        </button>
      </div>
      <div class="text-center">
        <router-link to="/signup">
          <div class="text-sm text-blue-500 hover:underline">회원가입</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import UserService from '@/service/UserService.js';
import { methods_naverLogin, handleNaverCallback } from '@/utils/naverUtils';
import axios from 'axios';

export default {
  name: 'LoginView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      const loginResponse = await UserService.login({
        id: email.value,
        password: password.value,
      });
      const resData = loginResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      userStore.init({
        token: resData.uniqId,
        id: resData.id,
        type: resData.userRole,
        school: resData.userSpaceInfo,
        extra: resData.extra,
      });

      const redirectPath = route.query.redirect || '/';
      router.push(redirectPath);
    };

    onBeforeMount(async () => {
      window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
          return;
        }
        const { type, code, state } = event.data;
        if (type === 'naverLogin') {
          if (code && state) {
            this.handleNaverCallback(code, state);
          }
        }
      });
    });

    return {
      email,
      password,
      handleSubmit,
      methods_naverLogin,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
