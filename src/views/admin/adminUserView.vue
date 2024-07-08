<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        {{ userType }} 관리
      </p>
      <div
        class="flex flex-col items-start w-full bg-gray-100 border border-gray-300 rounded-xl p-[20px] gap-[20px] text-sm"
      >
        <div class="flex gap-[20px] items-center font-bold">
          <p class="w-[40px]">검색어</p>
          <AppDropdown
            :options="options"
            :startText="selectedOption"
            :openFull="true"
            @update:selectedOption="handleSelection2"
          />
          <input
            class="py-2 px-4 border border-gray-300 bg-white rounded-md text-sm"
            type="text"
            placeholder="검색어를 입력하세요."
            v-model="searchText"
          />
          <AdminButton :text="'검색'" :isWhite="false" @click="searchList" />
        </div>
      </div>
      <div class="flex w-full justify-between content-center">
        <div class="text-xs font-medium content-center">
          총 {{ totalCount }}개 | 현재페이지 {{ page }}
        </div>
        <div>
          <AppDropdown
            v-if="selectedOption2"
            :options="options2"
            :startText="selectedOption2"
            @update:selectedOption="handleSelection1"
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
        :pageNo="page"
        :recordCount="10"
        :totalCount="totalCount"
        @updatePage="updatePage"
      />
      <div class="w-full text-right" v-if="userType === '학교'">
        <AdminButton :text="'등록'" @onClick="goUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onBeforeMount, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminPagination from '@/components/admin/AdminPagination.vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  name: 'adminUserView',
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
    const userType = computed(() => parseToKo(route.params.userType));
    const options2 = ref(['최신순', '오래된순']);
    const selectedOption2 = ref('최신순');
    const options = ref([]);
    const selectedOption = ref('');
    const searchText = ref('');
    const orderBy = ref('desc');
    const page = ref(1);
    const totalCount = ref(12);
    const uniqId = ref('');
    const userSpaceOrgInfo = ref('');
    const name = ref('');
    const id = ref('');
    const userEmail = ref('');

    const header = ref([
      {
        text: '번호',
      },
      {
        text: '회원번호',
      },
      {
        text: '권한',
      },
      {
        text: '소속',
      },
      {
        text: '이름',
      },
      {
        text: '아이디',
      },
      {
        text: '이메일',
      },
      {
        text: '관리',
      },
    ]);
    const body = ref([]);

    const handleSelection1 = (v) => {
      selectedOption.value = v;

      if (v === '최신순') orderBy.value = 'desc';
      if (v === '오래된순') orderBy.value = 'asc';
      fetchData();
    };

    const handleSelection2 = (v) => {
      selectedOption2.value = v;
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

    const parseToKo = (v) => {
      let result = '';
      switch (v) {
        case 'school':
          result = '학교';
          break;
        case 'teacher':
          result = '교사';
          break;
        case 'student':
          result = '학생';
          break;
      }
      return result;
    };

    onMounted(() => {
      fetchData();
    });

    watch(
      () => userType.value,
      () => {
        location.reload();
      }
    );

    const fetchData = async (data = {}) => {
      if (route.params.userType === 'school') {
        options.value = ['회원번호', '소속', '이름', '아이디', '이메일'];
      } else {
        options.value = ['소속', '이름', '아이디', '이메일'];
      }

      const response = await AdminService.getUsers(route.params.userType, {
        orderBy: orderBy.value,
        pageNo: page.value,
        ...data,
      });
      const resData = response.data;

      page.value = resData.pageNo;
      totalCount.value = resData.totalCount;

      console.log(resData);

      let arr = [];

      if (resData.adminUserInfoList) {
        resData.adminUserInfoList.map((item, index) => {
          let obj = [
            {
              text: index + 1 + (page.value - 1) * 10,
            },
            {
              text: item.uniqId,
            },
            {
              text: item.userRole,
            },
            {
              text: item.userSpaceOrgInfo,
            },
            {
              text: item.name,
            },
            {
              text: item.id,
            },
            {
              text: item.userEmail,
            },
            {
              isEditWidthDelete: true,
              id: item.uniqId,
            },
          ];

          arr.push(obj);
        });
      }

      if (resData.userInfoList) {
        resData.userInfoList.map((item, index) => {
          let obj = [
            {
              text: index + 1 + (page.value - 1) * 10,
            },
            {
              text: item.authorization,
            },
            {
              text: item.userRole,
            },
            {
              text: item.userSpaceInfo,
            },
            {
              text: item.name,
            },
            {
              text: item.authorization,
            },
            {
              text: item.userEmail,
            },
            {
              isEditWidthDelete: true,
              id: item.uniqId || item.authorization,
            },
          ];

          arr.push(obj);
        });
      }

      body.value = arr;
    };

    const searchList = () => {
      if (selectedOption2.value === '회원번호')
        fetchData({ uniqId: searchText.value });
      if (selectedOption2.value === '소속')
        fetchData({ userSpaceOrgInfo: searchText.value });
      if (selectedOption2.value === '이름')
        fetchData({ name: searchText.value });
      if (selectedOption2.value === '아이디')
        fetchData({ id: searchText.value });
      if (selectedOption2.value === '이메일')
        fetchData({ userEmail: searchText.value });
    };

    const updatePage = (v) => {
      page.value = v;
      fetchData();
    };

    const goUpdate = (id) => {
      router.push({
        name: 'adminUserUpdate',
        params: {
          userType: route.params.userType,
        },
        query: {
          id,
        },
      });
    };

    const doDelete = async (id) => {
      await AdminService.userDelete(id);

      alert('삭제되었습니다.');
      fetchData();
    };

    return {
      header,
      body,
      userType,
      options,
      selectedOption,
      startDate,
      formattedStartDate,
      endDate,
      formattedEndDate,
      page,
      totalCount,
      orderBy,
      options2,
      selectedOption2,
      searchText,

      handleSelection1,
      handleSelection2,
      searchList,
      updatePage,
      goUpdate,
      doDelete,
    };
  },
};
</script>

<style scoped></style>
