<template>
  <div class="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-md">
    <h1 class="text-2xl font-semibold mb-4">회원가입</h1>
    <form @submit.prevent="handleSignUp">
      <div class="mb-4 flex items-center">
        <label for="username" class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">아이디:</label>
        <div class="flex items-center flex-1">
          <input type="text" id="username" v-model="username" class="flex-1 px-3 py-2 border border-gray-300 rounded-md" required>
          <button type="button" @click="checkUsername" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">중복체크</button>
        </div>
      </div>
      <span v-if="usernameCheckResult" class="text-sm text-green-500">{{ usernameCheckResult }}</span>

      <div class="mb-4 flex items-center">
        <label for="password" class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">비밀번호:</label>
        <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
      </div>

      <div class="mb-4 flex items-center">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">비밀번호 확인:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
      </div>

      <div class="mb-4 flex items-center">
        <label class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">성별:</label>
        <div class="flex items-center">
          <label class="mr-4"><input type="radio" value="남" v-model="gender" class="mr-1"> 남</label>
          <label><input type="radio" value="여" v-model="gender" class="mr-1"> 여</label>
        </div>
      </div>

      <div class="mb-4 flex items-center">
        <label for="birthdate" class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">생년월일:</label>
        <input type="text" id="birthdate" v-model="birthdate" placeholder="YYMMDD" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
      </div>

      <div class="mb-4 flex items-center">
        <label for="school" class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">학교:</label>
        <input type="text" id="school" v-model="school" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
      </div>

      <div class="mb-4 flex items-center">
        <label for="grade" class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">학년:</label>
        <input type="text" id="grade" v-model="grade" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
      </div>

      <div class="mb-4 flex items-center">
        <label for="class" class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20">반:</label>
        <input type="text" id="class" v-model="classroom" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
      </div>

      <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md">회원가입</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const username = ref('');
    const usernameCheckData = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const gender = ref('');
    const birthdate = ref('');
    const school = ref('');
    const grade = ref('');
    const classroom = ref('');
    const usernameCheckResult = ref('');

    const checkUsername = () => {
      // todo : 아이디 중복 체크 api
      usernameCheckResult.value = '사용 가능한 아이디입니다.';
      usernameCheckData.value = username.value;
    };

    const handleSignUp = () => {
      if(!usernameCheckResult.value) {
        alert('아이디 중복체크를 해주세요');
        return;
      }

      if(username.value !== usernameCheckData.value) {
        alert('아이디 중복체크를 다시해주세요.');
        usernameCheckResult.value = '';
        return;
      }

      if (password.value !== confirmPassword.value) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }

      if (!gender.value) {
        alert('성별을 선택해주세요');
        return;
      }

      if (!birthdate.value) {
        alert('생년월일을 입력해주세요');
        return;
      }
      if (!school.value) {
        alert('학교를 입력해주세요');
        return;
      }
      if (!grade.value) {
        alert('학년을 입력해주세요');
        return;
      }
      if (!classroom.value) {
        alert('반을 입력해주세요');
        return;
      }

      // todo : 회원가입 로직 처리 api
      // 성공 시 아래로직
      // 실패 시 alert

      alert('회원가입 성공');
      router.back();
    };

    return {
      username,
      password,
      confirmPassword,
      gender,
      birthdate,
      school,
      grade,
      classroom,
      usernameCheckResult,
      checkUsername,
      handleSignUp
    };
  }
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
