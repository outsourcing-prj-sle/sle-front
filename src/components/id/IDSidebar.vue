<template>
  <div
    class="flex flex-col bg-[#404664] min-w-[270px] max-xl:min-w-[200px] max-md:min-w-[150px] max-sm:min-w-[130px] px-2 py-4 h-full"
    v-if="showSidebar"
  >
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isManageReport,
      }"
      @click="goManageReport"
      v-if="isManageReport"
    >
      설문 관리
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': !isManageReport,
      }"
      @click="goManageReport"
      v-if="!isManageReport"
    >
      학습성향
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
    const isManageReport = computed(() => route.meta.isManageReport);

    const userId = computed(() => IDStore.token);
    const userName = computed(() => IDStore.name);

    const goManageReport = () => {
      if (isManageReport.value) return;
      router.push({ name: 'manageReport' });
    };

    const logout = () => {
      IDStore.logout();
      router.push({ name: 'IDLogin' });
    };

    return {
      showSidebar,
      userId,
      userName,
      isManageReport,

      goManageReport,
      logout,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
