<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">하위분류 관리</p>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 {{ totalCount }}개 | 현재페이지 {{ page }}
        </div>
        <div class="flex gap-[20px] items-center font-bold">
          <AppDropdown
            :objectOptions="options"
            :startText="selectedOption"
            :openFull="true"
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
        :header="header"
        :body="body"
        @goEdit="goUpdate"
        @doDelete="doDelete"
      />
      <AdminPagination
        v-if="totalCount"
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
import { ref, onBeforeMount, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminPagination from '@/components/admin/AdminPagination.vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  name: 'adminCodeDetailView',
  components: {
    AdminPagination,
    AdminTable,
    AdminButton,
    AppDropdown,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.query.id);
    const adminStore = useAdminStore();
    const searchText = ref('');
    const options = ref([
      {
        name: '코드',
        value: 'subCodeId',
      },
      {
        name: '코드명',
        value: 'subCodeName',
      },
    ]);
    const selectedOption = ref('코드');
    const valueOption = ref('subCodeId');
    const header = ref([
      {
        text: '순서',
      },
      {
        text: '코드ID',
      },
      {
        text: '코드',
      },
      {
        text: '코드명',
      },
      // {
      //   text: '순서변경',
      // },
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
      const listResponse = await AdminService.subCodeInfoList(
        id.value,
        requestData
      );
      const resData = listResponse.data;
      if (resData.error) {
        alert(resData.error);
        return;
      }
      console.log(resData);

      const list = resData.subCodeList;
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
          text: list[i].subCodeId,
        });
        body.value[i].push({
          text: list[i].subCodeName,
        });
        // body.value[i].push({
        //   isUpDown: true,
        //   id: list[i].subCodeId,
        // });
        body.value[i].push({
          isEditWidthDelete: true,
          id: list[i].subCodeId,
        });
      }

      totalCount.value = resData.totalCount;
    };

    const handleSelection1 = (v) => {
      valueOption.value = v;
    };

    const goUpdate = (v) => {
      router.push({
        name: 'adminCodeDetailUpdate',
        query: {
          id: id.value,
          subCodeId: v,
        },
      });
    };

    const doDelete = async (v) => {
      let res = await AdminService.deleteSubCode(id.value, v);
      alert('삭제되었습니다.');
      fetchList();
    };

    const updatePage = (v) => {
      console.log(v);
      page.value = v;
      fetchList();
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
    };
  },
};
</script>

<style scoped></style>
