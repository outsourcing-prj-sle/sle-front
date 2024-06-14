<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
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
        <router-link to="/signup">
          <div class="text-sm text-blue-500 hover:underline">회원가입</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const email = ref('');
    const password = ref('');

    const handleSubmit = () => {
      console.log('Email:', email.value);
      console.log('Password:', password.value);
      // todo : 로그인 api 호출
      // 실패 시 그냥 alert 띄우고 성공 시 아래 로직 진행

      userStore.init({
        token: 'token',
        id: email.value,
        type: 'student',
        // type: 'teacher',
        extra: {},
      });

      router.back();
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
