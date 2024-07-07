<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">공통 코드관리</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 {{ totalCount }}개 | 현재페이지 {{ page }}
        </div>
        <div class="flex gap-[20px] items-center font-bold">
          <AppDropdown
            :objectOptions="options"
            :startText="selectedOption"
            :openMax="true"
            @update:selectedOption="handleSelection1"
          />
          <input
            class="py-2 px-4 border border-gray-300 bg-white rounded-md text-sm"
            type="text"
            v-model="searchText"
            placeholder="검색어를 입력하세요."
          />
          <AdminButton
            :text="'검색'"
            :isWhite="false"
            :isSearch="true"
            @onClick="fetchResearchList"
          />
        </div>
      </div>
      <AdminTable
        v-if="body.length"
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
    const searchText = ref('');
    const options = ref([
      {
        name: '선택',
        value: '',
      },
      {
        name: '회원구분',
        value: '01',
      },
      {
        name: '소속',
        value: '02',
      },
      {
        name: '이름',
        value: '03',
      },
      {
        name: '아이디',
        value: '04',
      },
      {
        name: '핸드폰 번호',
        value: '05',
      },
      {
        name: '이메일',
        value: '06',
      },
    ]);
    const selectedOption = ref('선택');
    const valueOption = ref('');
    const header = ref([
      {
        text: '번호',
      },
      {
        text: '코드ID',
      },
      {
        text: '코드ID명',
      },
      {
        text: '사용여부',
      },
      {
        text: '코드갯수',
      },
      {
        text: '하위코드',
      },
      {
        text: '관리',
      },
    ]);
    const body = ref([]);

    const page = ref(1);
    const recordCount = ref(10);
    const totalCount = ref(10);

    const handleSelection1 = (v) => {
      valueOption.value = v;
    };

    const goUpdate = (id) => {
      router.push({
        name: 'adminCodeUpdate',
        query: {
          id: id,
        },
      });
    };

    const doDelete = (id) => {
      console.log('yhs :: dodelete');
    };

    return {
      header,
      body,
      options,
      selectedOption,

      handleSelection1,
      goUpdate,
      doDelete,
    };
  },
};
</script>

<style scoped></style>
