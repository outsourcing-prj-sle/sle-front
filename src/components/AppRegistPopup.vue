<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
  >
    <div
      class="bg-white h-[428px] w-[488px] px-4 py-6 rounded-lg shadow-lg flex relative"
    >
      <div
        class="flex flex-col my-auto font-medium whitespace-nowrap hover:text-blue-200"
        :style="{ visibility: needPrev ? 'hidden' : 'visible' }"
        @click="stepPrev"
      >
        <button
          class="justify-center hover:bg-blue-200 mr-2 items-center px-3 text-base text-white rounded-full bg-stone-300 h-[34px] w-[34px]"
          aria-label="이전"
        >
          &lt;
        </button>
        <span class="mt-1 text-xs text-zinc-500">{{
          $t('login_popup.left_btn')
        }}</span>
      </div>
      <div class="flex-1">
        <TeacherResigtPopup1
          v-if="loginType === 'teacher' && step === 1"
          :userInfo="userInfo"
          @openWhaleProfile="openWhaleProfile"
        />
        <TeacherResigtPopup2
          v-else-if="loginType === 'teacher' && step === 2"
          @finRegist="finRegist"
        />
        <StudentResigtPopup1
          v-else-if="loginType === 'student' && step === 1"
          :userInfo="userInfo"
          @openWhaleProfile="openWhaleProfile"
        />
        <StudentResigtPopup2
          v-else-if="loginType === 'student' && step === 2"
          :_gender="gender"
          @changeGender="changeGender"
        />
        <StudentResigtPopup3
          v-else-if="loginType === 'student' && step === 3"
          :_year="year"
          :_month="month"
          @changeYear="changeYear"
          @changeMonth="changeMonth"
        />
        <StudentResigtPopup4
          v-else-if="loginType === 'student' && step === 4"
          @finRegist="finRegist"
        />
      </div>

      <div
        class="flex flex-col ml-2 my-auto font-medium whitespace-nowrap hover:text-blue-200"
        :style="{ visibility: needNext ? 'hidden' : 'visible' }"
        @click="stepNext"
      >
        <button
          class="justify-center hover:bg-blue-200 items-center px-3 text-base text-white rounded-full bg-stone-300 h-[34px] w-[34px]"
          aria-label="다음"
        >
          &gt;
        </button>
        <span class="mt-1 text-xs text-zinc-500">{{
          $t('login_popup.right_btn')
        }}</span>
      </div>

      <img
        src="@/assets/img/person_regist_icn.png"
        alt="person_regist_icn"
        class="self-end max-w-full h-[128px] w-[121px] absolute bottom-0 right-1.5"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/userStore.js';
import UserService from '@/service/UserService';
import TeacherResigtPopup1 from './TeacherResigtPopup1.vue';
import TeacherResigtPopup2 from './TeacherResigtPopup2.vue';
import StudentResigtPopup1 from './StudentResigtPopup1.vue';
import StudentResigtPopup2 from './StudentResigtPopup2.vue';
import StudentResigtPopup3 from './StudentResigtPopup3.vue';
import StudentResigtPopup4 from './StudentResigtPopup4.vue';

export default {
  components: {
    TeacherResigtPopup1,
    TeacherResigtPopup2,
    StudentResigtPopup1,
    StudentResigtPopup2,
    StudentResigtPopup3,
    StudentResigtPopup4,
  },
  props: {},
  setup(props, { emit }) {
    const { t } = useI18n();
    const userStore = useUserStore();
    const loginType = computed(() => userStore.type || 'student');
    const step = ref(1);
    const name = ref('김톡톡톡');
    const school = ref('이작초등학교');
    const grade = ref('1');
    const classroom = ref('2');
    const gender = ref();
    const year = ref();
    const month = ref();

    onMounted(() => {
      fetchData();
    });

    const needPrev = computed(() => {
      return step.value === 1;
    });

    const needNext = computed(() => {
      return (
        (loginType.value === 'student' && step.value === 4) ||
        (loginType.value === 'teacher' && step.value === 2)
      );
    });

    const userInfo = computed(() => {
      return `${school.value} ${grade.value}${t('common.grade')} ${classroom.value}${t('common.class')} ${name.value}`;
    });

    const openWhaleProfile = () => {
      const url = 'https://account.whalespace.io/s/profile';
      window.open(url);
    };

    const stepNext = () => {
      let flag = '';

      if (loginType.value === 'student' && step.value === 2 && !gender.value) {
        flag = t('common.gender_title');
      }

      if (
        loginType.value === 'student' &&
        step.value === 3 &&
        !(year.value && month.value)
      ) {
        flag = t('common.birth_title');
      }

      if (flag) {
        alert(flag);
        return;
      }
      step.value += 1;
    };

    const stepPrev = () => {
      step.value -= 1;
    };

    const fetchData = async () => {
      const myInfoRes = await UserService.myInfo();
      const resData = myInfoRes.data;
      if (!resData) return;
      if (resData.error) return;
      console.log(resData);

      name.value = resData.name;
      school.value = resData.userSpaceInfo;
      let tmp =
        resData?.userSpaceOrgInfo?.replace('반', '').split('학년 ') || [];
      grade.value = tmp[0];
      classroom.value = tmp[1];
    };

    const finRegist = async () => {
      const _gender = gender.value || 'F';
      const _birthday = `${year.value || '2000'}${month.value || '01'}01`;

      // 회원정보 수정
      UserService.updateUserInfo({
        profileImageId: 'asdf', // 프로필 이미지 아이디
        sex: _gender, // 성별 - todo : 구분자 알아야함 - f / m
        brthdy: _birthday,
      });
      userStore.finRegistered();
    };

    const changeGender = (v) => {
      gender.value = v;
    };

    const changeYear = (v) => {
      year.value = v;
    };

    const changeMonth = (v) => {
      month.value = v;
    };

    return {
      loginType,
      needPrev,
      needNext,
      step,
      userInfo,
      gender,
      month,
      year,

      openWhaleProfile,
      stepNext,
      stepPrev,
      finRegist,
      changeGender,
      changeYear,
      changeMonth,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
