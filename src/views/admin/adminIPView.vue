<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">IP설정</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 {{ totalCount }}개 | 현재페이지 {{ page }}
        </div>
      </div>
      <AdminTable
        :header="header"
        :body="body"
        @goEdit="goUpdate"
        @doDelete="doDelete"
      />

      <AdminPagination
        :pageNo="page"
        :recordCount="10"
        :totalCount="totalCount"
        @updatePage="updatePage"
      />
      <div class="w-full text-right">
        <AdminButton :text="'등록'" @onClick="goUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted } from 'vue';
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
    const page = ref(1);
    const limit = ref(10);
    const totalCount = ref();

    const header = ref([
      {
        text: '번호',
      },
      {
        text: '접근허용IP',
      },
      {
        text: '관리자ID',
      },
      {
        text: '사용여부',
      },
      {
        text: '관리',
      },
    ]);
    const body = ref([]);

    const goUpdate = (id) => {
      router.push({
        name: 'adminIPUpdate',
        query: {
          id,
        },
      });
    };

    onMounted(async () => {
      fetchList();
    });

    const doDelete = (id) => {
      console.log('todo :: delete');
    };

    const updatePage = (v) => {
      console.log(v);
      page.value = v;
      fetchList();
    };

    const fetchList = async () => {
      const systemInfoResponse = await AdminService.systemInfoList('ip');
      const resData = systemInfoResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }
      console.log(resData);
      const list = resData.ipInfoList;
      totalCount.value = resData.totalCount;

      for (const i in list) {
        const v = list[i];

        body.value.push([
          {
            text: parseInt(i) + 1 + '',
          },
          {
            text: v.allowedIp,
          },
          {
            text: v.createdBy,
          },
          {
            text: v.active ? '예' : '아니요',
          },
          {
            isEditWidthDelete: true,
            id: v.id,
          },
        ]);
      }
    };

    return {
      header,
      body,

      goUpdate,
      doDelete,
      updatePage,
    };
  },
};
</script>

<style scoped></style>
