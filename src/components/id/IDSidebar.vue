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
      @click="goPollManage"
      v-if="isManageReport"
    >
      설문 관리
    </div>
    
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isManageSel,
      }"
      @click="goIdttSelManage"
      v-if="isManageIdtt"
    >
      사회정서학습
    </div>
    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isManageLt,
      }"
      @click="goIdttLtManage"
      v-if="isManageIdtt"
    >
      학습성향
    </div>

    <div
      class="px-5 py-2 cursor-pointer text-left text-sm font-medium text-white"
      :class="{
        'bg-[#353C5E] border-l-4 border-l-[#2F80ED] text-base': isManageResearch,
      }"
      @click="goResearchManage"
      v-if="isManageResearch"
    >
      연구소관리자 관리
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
    const isManageSel = computed(() => route.meta.isManageSel);
    const isManageLt = computed(() => route.meta.isManageLt);
    const isManageIdtt = computed(() => route.meta.isManageSel || route.meta.isManageLt);
    const isManageResearch = computed(() => route.meta.isManageResearch);

    const userId = computed(() => IDStore.token);
    const userName = computed(() => IDStore.name);

    const goPollManage = () => {
      router.push({ name: 'IDManageReportView' });
    };

    const goIdttSelManage = () => {
      router.push({ name: 'IDManageSelView' });
    };

    const goIdttLtManage = () => {
      router.push({ name: 'IDManageLtView' });
    };

    const goResearchManage = () => {
      router.push({ name: 'IDManageResearchView' });
    };

    return {
      showSidebar,
      userId,
      userName,
      isManageReport,
      isManageSel,
      isManageLt,
      isManageIdtt,
      isManageResearch,

      goPollManage,
      goIdttSelManage,
      goIdttLtManage,
      goResearchManage,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
