<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">연구소관리자 관리</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 n개 | 현재페이지 1
        </div>
        <div>
          <AppDropdown
            v-if="selectedOption"
            :options="options"
            :startText="selectedOption"
            @update:selectedOption="handleSelection1"
          />
        </div>
      </div>
      <AdminTable :header="header" :body="body" />
      <AdminPagination :pageNo="1" :recordCount="10" :totalCount="12" />
      <div class="w-full text-right">
        <AdminButton :text="'등록'" @onClick="goSiteUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminPagination from '@/components/admin/AdminPagination.vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  name: 'adminSiteView',
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
    const page = ref(1);
    const limit = ref(10);
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

    onMounted(() => {
      fetchList();
    });

    const fetchList = async () => {
      const listResponse = await AdminService.systemInfoList('site', {
        page: page.value,
        limit: limit.value,
      });
      const resData = listResponse.data;
      if (resData.error) {
        alert(resData.error);
        return;
      }
      console.log(resData);
    };

    const handleSelection1 = (v) => {
      selectedOption.value = v;
    };

    const goSiteUpdate = () => {
      router.push({ name: 'adminSiteUpdate' });
    };

    return {
      header,
      body,
      options,
      selectedOption,

      handleSelection1,
      goSiteUpdate,
    };
  },
};
</script>

<style scoped></style>
