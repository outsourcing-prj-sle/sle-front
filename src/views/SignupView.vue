<template>
  <div class="max-w-[30rem] mx-auto p-6 bg-white border border-gray-300 rounded-md"
  :class = "{ 'absolute top-1/2 left-1/2 transform-center' : isSignUp }"
  >
    <h1 class="text-2xl font-semibold mb-4">회원가입</h1>

    <form @submit.prevent="handleSignUp">
      <div class="mb-1 flex items-center">
        <label
          for="username"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >아이디:</label
        >

        <div class="flex items-center flex-1">
          <input
            type="text"
            id="username"
            v-model="username"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="button"
            @click="checkUsername"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md min-w-[96px]"
          >
            중복체크
          </button>
        </div>
      </div>

      <span
        v-if="usernameCheckResult"
        class="text-sm text-green-500"
        :class="{
          'text-red-500 pr-[75px]':
            usernameCheckResult === '사용 불가능한 아이디입니다.',
        }"
        >{{ usernameCheckResult }}</span
      >

      <div class="mb-4 mt-4 flex items-center">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >비밀번호:</label
        >

        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4 flex items-center">
        <label
          for="confirmPassword"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >비밀번호<br>확인:</label
        >

        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4 flex items-center">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >이름:</label
        >

        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="홍길동"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4 flex items-center">
        <label class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >성별:</label
        >

        <div class="flex items-center">
          <label class="mr-4 cursor-pointer"
            ><input type="radio" value="M" v-model="gender" class="mr-1" />

            남</label
          >

          <label class="cursor-pointer"
            ><input type="radio" value="F" v-model="gender" class="mr-1" />

            여</label
          >
        </div>
      </div>

      <div class="mb-4 flex items-center">
        <label
          for="birthdate"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >생년월일:</label
        >

        <input
          type="text"
          id="birthdate"
          v-model="birthdate"
          placeholder="YYYYMMDD"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          maxlength="8"
        />
      </div>

      <div class="mb-4 flex items-center">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >이메일:</label
        >

        <input
          type="text"
          id="email"
          v-model="email"
          placeholder="example@email.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4 flex items-center">
        <label class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >구분:</label
        >

        <div class="flex items-center">
          <label class="mr-4 cursor-pointer"
            ><input type="radio" value="N" v-model="userType" class="mr-1" />

            학생</label
          >

          <label class="cursor-pointer"
            ><input type="radio" value="Y" v-model="userType" class="mr-1" />

            선생님</label
          >
        </div>
      </div>

      <div class="mb-4 flex items-center">
        <label
          for="school"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >학교:</label
        >

        <input
          type="text"
          id="school"
          v-model="school"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4 flex items-center">
        <label
          for="grade"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >학년:</label
        >

        <input
          type="text"
          id="grade"
          v-model="grade"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4 flex items-center">
        <label
          for="class"
          class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
          >반:</label
        >

        <input
          type="text"
          id="class"
          v-model="classroom"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        회원가입
      </button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '@/service/UserService';

export default {
  setup() {
    const router = useRouter();

    const username = ref('');
    const usernameCheckData = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const gender = ref('');
    const name = ref('');
    const birthdate = ref('');
    const email = ref('');
    const userType = ref('');
    const school = ref('');
    const grade = ref('');

    const classroom = ref('');
    const usernameCheckResult = ref('');

    const isSignUp = computed(() => {

      return location.pathname === '/signup';
    })

    const checkUsername = async () => {
      if (!username.value) {
        return;
      }

      // 아이디 체크
      const signupResponse = await UserService.checkId({
        id: username.value,
      });
      const resData = signupResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }
      if (!resData) {
        usernameCheckResult.value = '사용 가능한 아이디입니다.';
        usernameCheckData.value = username.value;
      } else {
        usernameCheckResult.value = '사용 불가능한 아이디입니다.';
      }
    };

    const handleSignUp = async () => {
      if (!usernameCheckResult.value) {
        alert('아이디 중복체크를 해주세요');
        return;
      }

      if (username.value !== usernameCheckData.value) {
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

      if (!userType.value) {
        alert('구분을 선택해주세요.');
        return;
      }

      if (!name.value) {
        alert('이름을 입력해주세요.');
        return;
      }

      if (!birthdate.value) {
        alert('생년월일을 입력해주세요');
        return;
      }

      if (!email.value) {
        alert('이메일을 입력해주세요.');
        return;
      }

      if (!school.value) {
        alert('학교를 입력해주세요');
        return;
      }

      if (!grade.value) {
        alert('학년을 숫자로 입력해주세요');
        return;
      }

      if (!classroom.value) {
        alert('반을 숫자로 입력해주세요');
        return;
      }

      // 회원가입
      const signupResponse = await UserService.signup({
        id: username.value, // 아이디
        name: name.value, // 사용자명
        password: password.value, // 비밀번호
        profileImageId: 'asdf', // 프로필 이미지 아이디
        userEmail: email.value, // 이메일
        sex: gender.value, // 성별 - todo : 구분자 알아야함 - f / m
        userType: userType.value, // 사용자 구분 - todo : 구분자 알아야함 - student, teacher?
        userSpaceInfo: school.value, // 소속 스페이스 정보
        gradeNm: grade.value,
        classNm: classroom.value,
        relationInfo: 'asdf', // 관계 정보 - ?..
      });

      const resData = signupResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      alert('회원가입 성공');
      router.back();
    };

    return {
      username,
      password,
      confirmPassword,
      gender,
      name,
      birthdate,
      email,
      userType,
      school,
      grade,
      classroom,
      isSignUp,
      usernameCheckResult,
      checkUsername,
      handleSignUp,
    };
  },
};
</script>

<style scoped>
  .transform-center {
    transform: translate(-50%, -50%)
  }
</style>
