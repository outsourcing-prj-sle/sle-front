<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">관리 로그</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 {{ totalCount }}개 | 현재페이지 {{ page }}
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
            v-model="searchText"
          />
          <AdminButton :text="'검색'" :isWhite="false" :isSearch="true" @click="submitData" />
        </div>
      </div>
      <AdminTable :header="header" :body="body" />

      <AdminPagination
        :pageNo="page"
        :recordCount="10"
        :totalCount="totalCount"
        @updatePage="updatePage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminPagination from '@/components/admin/AdminPagination.vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  name: 'adminLogView',
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
    const options = ref(['아이디', '변경내용']);
    const selectedOption = ref('아이디');
    const page = ref(1);
    const totalCount = ref(10);
    const searchText = ref('');
    const orderBy = ref('');

    const header = ref([
      {
        text: '번호',
      },
      {
        text: '요청자ID',
      },
      {
        text: '요청자명',
      },
      {
        text: '접속IP',
      },
      {
        text: '작업일시',
      },
      {
        text: '작업내용',
      },
    ]);
    const body = ref([]);

    onMounted(() => {
      fetchList();
    })

    const fetchList = async ( data = {} ) => {
      const response = await AdminService.getLog({ pageNo: page.value, ...data });
      const responseData = response.data;

      console.log(responseData);

      page.value = responseData.pageNo;
      totalCount.value = responseData.totalCount;

      let list = [];

      if(!responseData.logList) return;

      responseData.logList.map((item, index) => {
        let obj = [
          {
            text: ((index+1) + (page.value-1) * 10)
          },
          {
            text: item.id
          },
          {
            text: item.userName
          },
          {
            text: item.ipAddress
          },
          {
            text: item.accessTime
          },
          {
            text: item.apiUrl
          },
        ]

        list.push(obj);
      });

      body.value = list;
    };

    const handleSelection1 = (v) => {
      selectedOption.value = v;
    };

    const updatePage = (v) => {
      console.log(v);
      page.value = v;
      fetchList();
    };

    const submitData = () => {
      if(selectedOption.value === '아이디') fetchList({ id: searchText.value });
      if(selectedOption.value === '변경내용') fetchList({ apiUrl: searchText.value });
    };

    return {
      header,
      body,
      options,
      selectedOption,
      totalCount,
      page,
      searchText,

      handleSelection1,
      updatePage,
      submitData,
    };
  },
};
</script>

<style scoped></style>
