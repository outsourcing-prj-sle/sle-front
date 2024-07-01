<template>
  <div class="flex flex-col bg-white">
    <header
      class="flex gap-5 justify-between py-1.5 pl-5 pr-6 w-full border-b-8 border-solid border-neutral-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full items-center"
      v-if="showHeader"
    >
      <div class="cursor-pointer flex gap-7 flex-1" @click="goMain">
        <div class="flex justify-start w-[250px] py-3">
          <img src="@/assets/img/logo_sel.png" alt="Logo" class="h-[52px]" />
        </div>
        <div class="flex gap-5 items-center">
          <button
            class="px-5 py-3 text-base font-semibold h-fit"
            :class="{
              'rounded-2xl bg-blue-600 text-white': isReportManage,
            }"
            @click="goSite"
          >
            설문 관리
          </button>
          <button
            class="px-5 py-3 text-base font-semibold h-fit"
            :class="{
              'rounded-2xl bg-blue-600 text-white': !isReportManage,
            }"
            @click="goSite"
          >
            ID톡톡 관리
          </button>
          <button
            class="px-5 py-3 text-base font-semibold h-fit"
            :class="{
              'rounded-2xl bg-blue-600 text-white': !isReportManage,
            }"
            @click="goSite"
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
    const isReportManage = computed(() => route.meta.isReportManage);

    const userId = computed(() => adminStore.token);
    const userName = computed(() => adminStore.name);

    const goSite = () => {
      router.push({ name: 'adminSite' });
    };

    const logout = () => {
      adminStore.logout();
      router.push({ name: 'adminLogin' });
    };

    return {
      showHeader,
      userId,
      userName,
      isReportManage,

      goSite,
      logout,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
