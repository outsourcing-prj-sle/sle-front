<template>
  <div class="flex flex-col bg-white">
    <header
    class="flex gap-5 justify-between py-1.5 pl-5 pr-6 border-b-8 border-solid border-[#E8E8E8] max-md:px-5 items-center"
      v-if="showHeader"
    >
      <div class="flex gap-7 flex-1" @click="goMain">
        <div class="flex justify-start py-3 min-w-[100px] w-[250px] max-xl:w-[190px] max-md:w-[140px] max-sm:w-[100px]">
          <img src="@/assets/img/logo_sel.png" alt="Logo" class="h-[52px] cursor-pointer" @click="goPollManage" />
        </div>
        <div class="flex gap-5 items-center">
          <button
            class="px-5 py-3 text-base font-semibold h-fit text-nowrap"
            :class="{
              'rounded-2xl bg-blue-600 text-white': isManageReport,
            }"
            @click="goPollManage"
          >
            설문 관리
          </button>
          <button
            class="px-5 py-3 text-base font-semibold h-fit text-nowrap"
            :class="{
              'rounded-2xl bg-blue-600 text-white': isManageIdtt,
            }"
            @click="goIdttManage"
          >
            ID톡톡 관리
          </button>
          <button
            class="px-5 py-3 text-base font-semibold h-fit text-nowrap"
            :class="{
              'rounded-2xl bg-blue-600 text-white': isManageResearch,
            }"
            @click="goResearchManage"
          >
            연구소관리자 관리
          </button>
        </div>
      </div>
      <!-- 헤더 우측 버튼 -->
      <div class="flex gap-1">
        <div class="flex text-base font-semibold items-center">
          {{ userName }}
        </div>
        <!-- 내정보 버튼 -->
        <div
          class="w-10 h-10 ml-6 flex items-center justify-center rounded-full bg-gray-200"
          v-if="userId"
        >
          <img
            src="@/assets/img/admin_user.png"
            alt="admin_user"
            class="shrink-0 w-5 aspect-[1] cursor-pointer"
          />
        </div>

        <!-- 로그아웃 -->
        <div
          class="w-10 h-10 ml-6 flex items-center justify-center rounded-full bg-gray-200"
          @click="logout"
          v-if="userId"
        >
          <img
            src="@/assets/img/admin_logout.png"
            alt="admin_logout"
            class="shrink-0 w-5 aspect-[1] cursor-pointer"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const showHeader = computed(() => route.meta.headerVisible);
    const isManageReport = computed(() => route.meta.isManageReport);
    const isManageIdtt = computed(() => route.meta.isManageSel || route.meta.isManageLt);
    const isManageResearch = computed(() => route.meta.isManageResearch);

    const userId = computed(() => adminStore.token);
    const userName = computed(() => adminStore.name);

    const goSite = () => {
      router.push({ name: 'adminSite' });
    };

    const logout = () => {
      adminStore.logout();
      router.push({ name: 'adminLogin' });
    };

    const goPollManage = () => {
      router.push({ name: 'IDManageReportView' });
    };

    const goIdttManage = () => {
      router.push({ name: 'IDManageSelView' });
    };

    const goResearchManage = () => {
      router.push({ name: 'IDManageResearchView' });
    };

    return {
      showHeader,
      userId,
      userName,
      isManageReport,
      isManageIdtt,
      isManageResearch,

      goSite,
      logout,
      goPollManage,
      goIdttManage,
      goResearchManage
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
