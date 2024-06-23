<template>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md content-center p-8 space-y-8 min-h-[350px] bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2"
      style="transform: translate(-50%, -50%)"
    >
      <div class="flex justify-center mb-[60px]">
        <img src="@/assets/img/logo_sel.png" alt="Logo" class="h-24" />
      </div>
      <div class="flex items-center justify-center">
        <button
          @click="methods_naverLogin"
          type="submit"
          class="w-[230px] text-center items-center flex justify-center px-4 py-2 text-base font-medium text-white bg-blue-900 rounded hover:bg-blue-600 focus:outline-none"
        >
          <img
            src="@/assets/img/whale_login_icn.png"
            alt="whale_icn"
            class="h-4 mr-1"
          />
          경남교육청 로그인
        </button>
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
        isRegistered: resData.isRegistered,
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
            handleNaverCallback(code, state);
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
