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
            @onClick="fetchList"
          />
        </div>
      </div>
      <AdminTable
        v-if="body.length"
        :header="header"
        :body="body"
        @goEdit="goUpdate"
        @doDelete="doDelete"
        @goDetail="goDetail"
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
import { ref, onMounted, computed } from 'vue';
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
        name: '코드ID',
        value: 'codeId',
      },
      {
        name: '코드ID명',
        value: 'codeName',
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
    const limit = ref(10);
    const totalCount = ref(10);

    onMounted(() => {
      fetchList();
    });

    const fetchList = async () => {
      const requestData = {
        pageNo: page.value,
        recordCount: recordCount.value,
      };
      if (valueOption.value && searchText.value) {
        requestData[valueOption.value] = searchText.value;
      }
      const listResponse = await AdminService.systemInfoList(
        'cmmn_code',
        requestData
      );
      const resData = listResponse.data;
      if (resData.error) {
        alert(resData.error);
        return;
      }
      console.log(resData);

      const list = resData.codeInfoList;
      body.value = [];
      for (const i in list) {
        body.value[i] = [];
        body.value[i].push({
          text: (page.value - 1) * 10 + parseInt(i) + 1,
        });
        body.value[i].push({
          text: list[i].codeId,
        });
        body.value[i].push({
          text: list[i].codeName,
        });
        body.value[i].push({
          text: list[i].active ? '예' : '아니요',
        });
        body.value[i].push({
          text: list[i].subCount || '0',
        });
        body.value[i].push({
          isDetail: true,
          id: list[i].codeId,
        });
        body.value[i].push({
          isEditWidthDelete: true,
          id: list[i].codeId,
        });
      }

      totalCount.value = resData.totalCount;
    };

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

    const doDelete = async (id) => {
      let res = await AdminService.deleteSystem('cmmn_code', id);
      alert('삭제되었습니다.');
      fetchList();
    };

    const updatePage = (v) => {
      console.log(v);
      page.value = v;
      fetchList();
    };

    const goDetail = (v) => {
      router.push({
        name: 'adminCodeDetail',
        query: {
          id: v,
        },
      });
    };

    return {
      header,
      body,
      options,
      selectedOption,
      page,
      totalCount,
      searchText,

      handleSelection1,
      goUpdate,
      doDelete,
      updatePage,
      fetchList,
      goDetail,
    };
  },
};
</script>

<style scoped></style>
