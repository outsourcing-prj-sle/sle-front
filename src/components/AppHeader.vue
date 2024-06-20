<template>
  <div class="flex flex-col bg-white">
    <header
      class="flex gap-5 justify-between py-1.5 pr-9 pl-20 w-full border border-solid border-neutral-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full items-center"
      v-if="showHeader"
    >
      <div class="cursor-pointer" @click="goMain">
        <div class="flex gap-2 my-auto">
          <img
            src="@/assets/img/logo_header.png"
            alt="logo_header"
            class="shrink-0 max-w-full aspect-[3.45] w-[65px]"
          />
          <div class="flex gap-[3px] items-end">
            <div class="grow text-sm text-neutral-500">과 함께하는</div>
          </div>
        </div>
        <div class="flex-auto text-2xl font-bold text-violet-950 text-left">
          SEL 사회정서학습
        </div>
      </div>
      <!-- 헤더 우측 버튼 -->
      <div class="flex gap-1">
        <!-- 내정보 버튼 -->
        <div class="w-[40px]" v-if="isMyInfoPage">
          <img
            src="@/assets/img/isMyInfo_icn.png"
            alt="isMyInfo_icn"
            class="shrink-0 max-w-full aspect-[1] cursor-pointer"
          />
        </div>
        <div class="w-[40px]" @click="goMyInfoBtn" v-else>
          <img
            src="@/assets/img/myInfo_icn.png"
            alt="myInfo_icn"
            class="shrink-0 max-w-full aspect-[1] cursor-pointer"
          />
        </div>

        <!-- 로그아웃 -->
        <div class="w-[40px]" @click="logout" v-if="userId">
          <img
            src="@/assets/img/logout_icn.png"
            alt="logout_icn"
            class="shrink-0 max-w-full aspect-[1] cursor-pointer"
          />
        </div>
      </div>
    </header>
    <div
      class="items-start cursor-pointer text-left gap-2 py-5 flex pr-16 pl-20 w-full text-base font-medium text-black bg-white max-md:pr-5 max-md:pl-5 max-md:max-w-full"
      v-if="userId"
    >
      <div
        class="px-2 text-center items-center max-w-max font-bold text-lg"
        :class="isMySELView && 'text-blue-500'"
        v-if="loginType === 'student'"
        @click="goStudentSEL"
      >
        나의 SEL 알기
      </div>
      <div
        class="px-2 text-center items-center max-w-max font-bold text-lg"
        :class="isAllSELView && 'text-blue-500'"
        v-if="loginType !== 'student'"
        @click="goTeacherSEL"
      >
        학생 SEL 알기
      </div>
      <div
        class="px-2 text-center items-center max-w-max font-bold text-lg"
        :class="isIDTTView && 'text-blue-500'"
        v-if="loginType !== 'student'"
        @click="goTeacherID"
      >
        ID 톡톡
      </div>
    </div>
  </div>
  <div
    class="items-start border-t-2 border-solid border-neutral-300 cursor-pointer text-left gap-2 py-5 flex pr-16 pl-20 w-full text-base font-medium text-black bg-white max-md:pr-5 max-md:pl-5 max-md:max-w-full"
    v-if="isIDTTView"
  >
    <div
      class="px-2 text-center items-center max-w-max font-bold text-lg"
      :class="isIDTTView && 'text-blue-500'"
      v-if="loginType !== 'student'"
      @click="goTeacherID"
    >
      사회정서학습 톡톡
    </div>
    <!-- <div
      class="px-2 text-center items-center max-w-max font-bold text-lg"
      v-if="loginType !== 'student'"
      @click="waitAlert"
    >
      학습성향 톡톡
    </div> -->
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const showHeader = computed(() => route.meta.headerVisible);
    const isMyInfoPage = computed(() => route.meta.isMyInfoPage);
    const isMySELView = computed(() => route.meta.isMySELView);
    const isAllSELView = computed(() => route.meta.isAllSELView);
    const isIDTTView = computed(() => route.meta.isIDTTView);

    const userId = computed(() => userStore.id);
    const loginType = computed(() => userStore.type);

    const goMain = () => {
      router.push({ name: 'home' });
    };

    const logout = () => {
      userStore.logout();
      router.push({ name: 'login' });
    };

    const checkId = () => {
      console.log(userId.value);
    };

    const goMyInfoBtn = () => {
      if (userId.value) {
        router.push({ name: 'myInfo' });
      } else {
        router.push({ name: 'login' });
      }
    };

    const goStudentSEL = () => {
      router.push({ name: 'mySEL' });
    };

    const goTeacherSEL = () => {
      router.push({ name: 'allSEL' });
    };

    const goTeacherID = () => {
      router.push({ name: 'idTT' });
    };

    const waitAlert = () => {
      alert('아직 준비중 입니다.');
    };

    return {
      showHeader,
      userId,
      isMyInfoPage,
      isMySELView,
      isAllSELView,
      isIDTTView,
      loginType,

      goStudentSEL,
      goTeacherSEL,
      goTeacherID,
      goMain,
      logout,
      checkId,
      goMyInfoBtn,
      waitAlert,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
