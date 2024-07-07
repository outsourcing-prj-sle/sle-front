<template>
  <div
    class="flex flex-col bg-[#404664] min-w-[270px] max-xl:min-w-[200px] max-md:min-w-[150px] max-sm:min-w-[130px] px-2 py-4 h-full"
    v-if="showSidebar"
  >
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isSite,
      }"
      @click="goSite"
      v-if="isSystemManagement"
    >
      사이트 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isTerm,
      }"
      @click="goTerm"
      v-if="isSystemManagement"
    >
      약관 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isCode,
      }"
      @click="goCode"
      v-if="isSystemManagement"
    >
      공통코드 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isIP,
      }"
      @click="goIP"
      v-if="isSystemManagement"
    >
      IP설정
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isManagement,
      }"
      @click="goManage"
      v-if="isManagement"
    >
      관리자 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base':
          userType === 'school',
      }"
      @click="() => goUser('school')"
      v-if="isUserManangement"
    >
      학교 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base':
          userType === 'teacher',
      }"
      @click="() => goUser('teacher')"
      v-if="isUserManangement"
    >
      교사 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base':
          userType === 'student',
      }"
      @click="() => goUser('student')"
      v-if="isUserManangement"
    >
      학생 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isLogManagement,
      }"
      @click="goLog"
      v-if="isLogManagement"
    >
      관리 로그
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const IDStore = useIDStore();
    const showSidebar = computed(() => route.meta.sidebarVisible);
    const isSystemManagement = computed(() => route.meta.isSystemManagement);
    const isManagement = computed(() => route.meta.isManagement);
    const isUserManangement = computed(() => route.meta.isUserManangement);
    const isLogManagement = computed(() => route.meta.isLogManagement);
    const isSite = computed(() => route.meta.isSite);
    const isTerm = computed(() => route.meta.isTerm);
    const isCode = computed(() => route.meta.isCode);
    const isIP = computed(() => route.meta.isIP);
    const userType = computed(() => route.params.userType);

    const userId = computed(() => IDStore.token);
    const userName = computed(() => IDStore.name);

    const goSite = () => {
      if (isSite.value) return;
      router.push({ name: 'adminSite' });
    };

    const goTerm = () => {
      if(isTerm.value) return;
      router.push({ name: 'adminTerm' });
    }

    const goCode = () => {
      if (isCode.value) return;
      router.push({ name: 'adminCode' });
    };

    const goIP = () => {
      if (isIP.value) return;
      router.push({ name: 'adminIP' });
    };

    const goManage = () => {
      if (isManagement.value) return;
      router.push({ name: 'adminManage' });
    };

    const goLog = () => {
      if (isLogManagement.value) return;
      router.push({ name: 'adminLog' });
    };

    const goUser = (type) => {
      if (type === userType.value) return;
      router.push({ name: 'adminUser', params: { userType: type } });
    };

    const logout = () => {
      IDStore.logout();
      router.push({ name: 'IDLogin' });
    };

    return {
      showSidebar,
      userId,
      userName,
      isSystemManagement,
      isManagement,
      isUserManangement,
      isLogManagement,
      isSite,
      isTerm,
      isCode,
      isIP,
      userType,

      goSite,
      goTerm,
      goCode,
      goLog,
      goIP,
      goManage,
      goUser,
      logout,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
