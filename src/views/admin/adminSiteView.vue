<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">연구소관리자 관리</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 {{ totalCount }}개 | 현재페이지 {{ page }}
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
      <AdminTable
        v-if="body.length"
        :header="header"
        :body="body"
        @goEdit="goEdit"
      />
      <AdminPagination
        :pageNo="page"
        :recordCount="10"
        :totalCount="totalCount"
        @updatePage="updatePage"
      />
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
    const totalCount = ref();
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
    const body = ref([]);

    onMounted(() => {
      fetchList();
    });

    const fetchList = async () => {
      const listResponse = await AdminService.systemInfoList('site', {
        pageNo: page.value,
        limit: limit.value,
        orderBy: selectedOption.value === '오래된순' ? 'asc' : 'desc',
      });
      const resData = listResponse.data;
      if (resData.error) {
        alert(resData.error);
        return;
      }
      console.log(resData);

      const list = resData.siteInfoList;
      body.value = [];
      for (const i in list) {
        body.value[i] = [];
        body.value[i].push({
          text: (page.value - 1) * 10 + parseInt(i) + 1,
        });
        body.value[i].push({
          text: list[i].siteName,
        });
        body.value[i].push({
          text: list[i].siteDomain,
        });
        body.value[i].push({
          text: list[i].createdAt.split(' ')[0],
        });
        body.value[i].push({
          isEdit: true,
          id: list[i].siteId,
        });
      }

      totalCount.value = resData.totalCount;
    };

    const handleSelection1 = (v) => {
      selectedOption.value = v;
      fetchList();
    };

    const goSiteUpdate = () => {
      router.push({ name: 'adminSiteUpdate' });
    };

    const updatePage = (v) => {
      console.log(v);
      page.value = v;
      fetchList();
    };

    const goEdit = (id) => {
      router.push({
        name: 'adminSiteUpdate',
        query: {
          id: id,
        },
      });
    };

    return {
      header,
      body,
      options,
      limit,
      totalCount,
      page,
      selectedOption,

      handleSelection1,
      goSiteUpdate,
      updatePage,
      goEdit,
    };
  },
};
</script>

<style scoped></style>
