<template>
  <div class="max-w-[22rem] mx-auto p-6 bg-white">
    <div class="w-full flex justify-center my-[20px]">
      <img class="w-[154px] h-[154px]" src="../assets/img/profile-example.png" alt="">
    </div>
    <h1 class="text-2xl font-semibold mb-1">홍길동</h1>
    <p class="font-regular">dlwkr01@gne.go.kr</p>
    <p class="text-gray-500">학생</p>
    <button
      type="button"
      @click="() => {isUpdate = !isUpdate}"
      class="my-[10px] px-4 py-2 bg-gray-600 text-white rounded-md min-w-[96px]"
    >
      회원정보 수정하기
    </button>
    <form @submit.prevent="handleUpdateUserInfo">
      <div class="flex gap-[20px] items-center justify-start my-[20px]">
        <div class="flex flex-col gap-[30px] items-start">
          <b>소속</b>
          <b>조직</b>
        </div>
        <div class="flex flex-col gap-[30px] items-start">
          <p v-if="!isUpdate">이작초등학교</p>
          <input v-if="isUpdate" class="w-full border border-gray-500" type="text" id="school" v-model="school" required>
          <p v-if="!isUpdate">1학년 3반</p>
          <div v-if="isUpdate" class="flex gap-[20px]">
            <div class="flex gap-[10px]">
              <input class="w-[35px] border border-gray-500" type="text" id="grade" v-model="grade" required>
              <p>학년</p>
            </div>
            <div class="flex gap-[20px]">
              <input class="w-[35px] border border-gray-500" type="text" id="classroom" v-model="classroom">
              <p>반</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start pt-[20px]">
        <b class="text-blue-500">추가회원 정보</b>
      </div>
      <div class="flex gap-[20px] items-center justify-start my-[20px]">
        <div class="flex flex-col gap-[30px] items-start">
          <b>성별</b>
          <b>생년월일</b>
        </div>
        <div class="flex flex-col gap-[30px] items-start">
          <div class="flex gap-[20px]">
            <div class="flex gap-[10px]">
              <input type="radio" id="sex-m" v-model="gender" value="M">
              <label class="cursor-pointer" for="sex-m">남자</label>
            </div>
            <div class="flex gap-[10px]">
              <input type="radio" id="sex-w" v-model="gender" value="F">
              <label class="cursor-pointer" for="sex-w">여자</label>
            </div>
          </div>
          <div class="flex gap-[20px]">
            <AppDropdown
              :options="options"
              :startText="selectedOption"
            />
            <AppDropdown
              :options="options2"
              :startText="selectedOption2"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        @click="checkUsername"
        class="my-[10px] px-4 py-2 mt-[50px] bg-blue-600 text-white rounded-md min-w-[96px]"
      >
        저장
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '@/service/UserService';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  components: {
    AppDropdown,
  },
  setup() {
    const router = useRouter();

    const options = ref(['2014', '2015', '2016']);
    const selectedOption = ref('2014');

    const options2 = ref(['08', '09', '10']);
    const selectedOption2 = ref('08');

    const isUpdate = ref(false);

    const gender = ref('');
    const birthdate = ref('');
    const school = ref('');
    const grade = ref('');
    const classroom = ref('');

    const handleUpdateUserInfo = async () => {
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
        alert('학년을 숫자로 입력해주세요');
        return;
      }

      if (!classroom.value) {
        alert('반을 숫자로 입력해주세요');
        return;
      }

      if(!birthdate.value) {
        alert('생년월일을 선택해주세요');
        return;
      }

      // 회원정보 수정
      const updateUserInfoResponse = await UserService.signup({
        profileImageId: 'asdf', // 프로필 이미지 아이디
        sex: gender.value, // 성별 - todo : 구분자 알아야함 - f / m
        userSpaceInfo: school.value, // 소속 스페이스 정보
        gradeNm: grade.value,
        classNm: classroom.value,
        brthdy: birthdate.value
      });

      const resData = updateUserInfoResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      alert('회원수정 성공');
      router.back();
    };

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      isUpdate,
      gender,
      birthdate,
      school,
      grade,
      classroom,
      handleUpdateUserInfo,
    };
  },
};
</script>

<style scoped>
  .transform-center {
    transform: translate(-50%, -50%)
  }
</style>
