<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">공통 코드관리</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 n개 | 현재페이지 1/10
        </div>
        <div class="flex gap-[20px] items-center font-bold">
          <AppDropdown
            :options="options"
            :startText="selectedOption"
            :openFull="true"
            @update:selectedOption="handleSelection1"
          />
          <input
            class="py-2 px-4 border border-gray-300 bg-white rounded-md text-sm"
            type="text"
            placeholder="검색어를 입력하세요."
          />
          <AdminButton :text="'검색'" :isWhite="false" :isSearch="true" />
        </div>
      </div>
      <AdminTable :header="header" :body="body" />
      <AdminPagination :pageNo="1" :recordCount="10" :totalCount="12" />
      <div class="w-full text-right">
        <AdminButton :text="'등록'" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminPagination from '@/components/admin/AdminPagination.vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  name: 'adminCodeManageView',
  components: {
    AdminPagination,
    AdminTable,
    AdminButton,
    AppDropdown,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const options = ref(['최신순', '오래된순']);
    const selectedOption = ref('최신순');
    const header = ref([
      {
        text: '번호',
      },
      {
        text: '사이트명',
      },
      {
        text: '사이트도메인',
      },
      {
        text: '등록일',
      },
      {
        text: '수정',
      },
    ]);
    const body = ref([
      [
        {
          text: '1',
        },
        {
          text: '톡톡클래스',
        },
        {
          text: 'tt.class.kr',
        },
        {
          text: '2024-03-02',
        },
        {
          isEdit: true,
        },
      ],
    ]);

    const handleSelection1 = (v) => {
      selectedOption.value = v;
    };

    const startDate = ref(new Date());
    const formattedStartDate = computed(() => {
      const tmp = new Date(startDate.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });

    const endDate = ref(new Date());
    const formattedEndDate = computed(() => {
      const tmp = new Date(endDate.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });

    return {
      header,
      body,
      options,
      selectedOption,
      startDate,
      formattedStartDate,
      endDate,
      formattedEndDate,

      handleSelection1,
    };
  },
};
</script>

<style scoped></style>
