<template>
  <div class="max-w-[27rem] mx-auto p-6 bg-white">
    <div class="w-full flex justify-center my-[20px]">
      <img
        class="w-[154px] h-[154px]"
        src="@/assets/img/profile-example.png"
        alt=""
      />
    </div>
    <h1 class="text-2xl font-semibold mb-1">{{ name }}</h1>
    <p class="font-regular">{{ email }}</p>
    <p class="text-gray-500">{{ userType }}</p>
    <button
      type="button"
      class="my-[10px] px-4 py-2 bg-gray-600 text-white rounded-md min-w-[96px]"
      @click="openWhale"
    >
      회원정보 수정하기
    </button>
    <div class="flex gap-[20px] items-center justify-start my-[20px]">
      <div class="flex w-[80px] flex-col gap-[30px] items-start">
        <b>소속</b>
        <b>조직</b>
      </div>
      <div class="flex flex-col gap-[30px] items-start">
        <p>{{ school }}</p>
        <p>{{ grade }}학년 {{ classroom }}반</p>
      </div>
    </div>
    <template v-if="userType !== '선생님'">
      <div class="flex justify-start pt-[20px]">
        <b class="text-blue-500">추가회원 정보</b>
      </div>
      <div class="flex gap-[20px] items-center justify-start my-[20px]">
        <div class="flex w-[80px] flex-col gap-[30px] items-start">
          <b>성별</b>
          <b>생년월일</b>
        </div>
        <div class="flex flex-col gap-[30px] items-start">
          <div class="flex gap-[20px]">
            <div class="flex gap-[10px]">
              <input type="radio" id="sex-m" v-model="gender" value="M" />
              <label class="cursor-pointer" for="sex-m">남자</label>
            </div>
            <div class="flex gap-[10px]">
              <input type="radio" id="sex-w" v-model="gender" value="F" />
              <label class="cursor-pointer" for="sex-w">여자</label>
            </div>
          </div>
          <div class="flex gap-[20px]">
            <AppDropdown
              v-if="selectedOption"
              :options="options"
              :startText="selectedOption"
              @update:selectedOption="handleSelection1"
            />
            <AppDropdown
              v-if="selectedOption2"
              :options="options2"
              :startText="selectedOption2"
              @update:selectedOption="handleSelection2"
            />
            <AppDropdown
              v-if="selectedOption3"
              :options="options3"
              :startText="selectedOption3"
              @update:selectedOption="handleSelection3"
            />
          </div>
        </div>
      </div>
    </template>
    <button
      v-if="userType !== '선생님'"
      type="button"
      @click="submitInfo"
      class="my-[10px] px-4 py-2 mt-[50px] bg-blue-600 text-white rounded-md min-w-[96px]"
    >
      저장
    </button>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
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
    const selectedOption = ref('');

    const options2 = ref([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ]);
    const selectedOption2 = ref('');

    const options3 = ref(['01']);
    const selectedOption3 = ref('');

    const gender = ref('');
    const school = ref('');
    const grade = ref('');
    const classroom = ref('');
    const userType = ref('');
    const email = ref('');
    const name = ref('');
    const birthdate = computed(() => {
      return (
        selectedOption.value +
        '' +
        selectedOption2.value +
        '' +
        selectedOption3.value
      );
    });

    onMounted(async () => {
      const myInfoRes = await UserService.myInfo();
      const resData = myInfoRes.data;
      console.log(resData);

      userType.value = resData.userType === 'Y' ? '선생님' : '학생';
      email.value = resData.userEmail;
      gender.value = resData.sex;
      name.value = resData.name;
      school.value = resData.userSpaceInfo;
      let tmp =
        resData?.userSpaceOrgInfo?.replace('반', '').split('학년 ') || [];
      grade.value = tmp[0];
      classroom.value = tmp[1];

      parseBirthday(resData.brthdy);
    });

    const submitInfo = async (e) => {
      // 회원정보 수정
      const updateUserInfoResponse = await UserService.updateUserInfo({
        profileImageId: 'asdf', // 프로필 이미지 아이디
        sex: gender.value, // 성별 - todo : 구분자 알아야함 - f / m
        brthdy: birthdate.value,
      });

      const resData = updateUserInfoResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      alert('회원수정 성공');
      router.back();
    };

    function getLastDayOfMonth(y = options.value, m = options2.value) {
      return new Date(y, m, 0).getDate();
    }

    function parseBirthday(birthday) {
      const y = birthday ? birthday.substring(0, 4) : null;
      const m = birthday ? birthday.substring(4, 6) : null;
      const d = birthday ? birthday.substring(6, 8) : null;

      const currentYear = new Date().getFullYear();
      const yearsArray = [];
      for (let i = currentYear - 30; i <= currentYear; i++) {
        yearsArray.push(i.toString());
      }
      options.value = yearsArray.reverse();
      selectedOption.value = y || options.value[0];

      selectedOption2.value = m || options2.value[0];

      const dateNum = getLastDayOfMonth(y, m);
      const dateArray = [];
      for (let i = 1; i <= dateNum; i++) {
        const monthString = i < 10 ? `0${i}` : `${i}`;
        dateArray.push(monthString);
      }
      options3.value = dateArray;
      selectedOption3.value = d || options3.value[0];
    }

    const handleSelection1 = (option) => {
      selectedOption.value = option;
    };

    const handleSelection2 = (option) => {
      selectedOption2.value = option;
    };

    const handleSelection3 = (option) => {
      selectedOption3.value = option;
    };

    const openWhale = () => {
      const url = 'https://account.whalespace.io/s/profile';
      window.open(url);
      UserService.myInfoInterval();
    };

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      options3,
      selectedOption3,
      userType,
      email,
      gender,
      name,
      school,
      grade,
      classroom,
      birthdate,
      handleSelection1,
      handleSelection2,
      handleSelection3,
      submitInfo,
      openWhale,
    };
  },
};
</script>

<style scoped>
.transform-center {
  transform: translate(-50%, -50%);
}
</style>
