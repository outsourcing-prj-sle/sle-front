<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">IP설정</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 n개 | 현재페이지 1
        </div>
      </div>
      <AdminTable :header="header" :body="body" />
      <AdminPagination :pageNo="1" :recordCount="10" :totalCount="12" />
      <div class="w-full text-right">
        <AdminButton :text="'등록'" @onClick="goUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminPagination from '@/components/admin/AdminPagination.vue';
import AdminButton from '@/components/admin/AdminButton.vue';

export default {
  name: 'adminIPView',
  components: {
    AdminPagination,
    AdminTable,
    AdminButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
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

    const goUpdate = (id) => {
      router.push({
        name: 'adminIPUpdate',
        query: {
          id,
        },
      });
    };

    return {
      header,
      body,

      goUpdate,
    };
  },
};
</script>

<style scoped></style>
