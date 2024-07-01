<template>
  <div class="flex justify-center">
    <AppNewTabPopup
      v-if="showPopup"
      class="z-50"
      :dicKey="dicKey"
      @closePopup="() => closePopup()"
    />
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
          {{ $t('login.login_rudska') }}
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
import AppNewTabPopup from '@/components/AppNewTabPopup.vue';

export default {
  name: 'LoginView',
  components: {
    AppNewTabPopup,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const email = ref('');
    const password = ref('');
    const showPopup = ref(false);
    const dicKey = ref('');

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
    };

    onBeforeMount(() => {
      // 웨일스페이스 팝업 핸들링
      window.addEventListener('message', async (event) => {
        if (event.origin !== window.location.origin) {
          return;
        }
        console.log('??????????');
        console.log(event);
        const { type, code, state } = event.data;
        if (type === 'naverLogin') {
          if (code && state) {
            const callbackRes = await handleNaverCallback(code, state);
            const resData = callbackRes?.data;
            console.log(resData);
            console.log(resData.authorization);

            if (resData?.authorization) {
              userStore.init({
                token: resData.authorization,
                type: resData.userRole,
                isRegistered: !!resData.sex,
                extra: resData.extra,
              });

              const redirectPath = route.query.redirect || '/';
              router.push(redirectPath);
            } else {
              if (resData === 'no_userdata' || resData === 'no_userId') {
                showPopup.value = true;
                dicKey.value = resData;
              } else if (resData === 'server_error') {
                alert('서버 에러입니다.\n담당자에게 문의해주세요.');
              }
            }
          }
        }
      });
    });

    const closePopup = () => {
      showPopup.value = false;
    };

    return {
      email,
      password,
      showPopup,
      dicKey,
      handleSubmit,
      methods_naverLogin,
      closePopup,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
