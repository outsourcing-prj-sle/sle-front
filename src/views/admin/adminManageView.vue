<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">관리자 관리</p>
      <div
        class="flex flex-col items-start w-full bg-gray-100 border border-gray-300 rounded-xl p-[20px] gap-[20px] text-sm"
      >
        <div class="flex gap-[20px] items-center font-bold">
          <p class="w-[50px]">기간</p>
          <VDatePicker v-model="startDate">
            <template #default="{ togglePopover }">
              <div class="flex items-center gap-2">
                <button
                  class="px-10 py-2.5 text-[#797979] rounded-xl text-xs font-light bg-white border-[#CECECE] border border-solid"
                  @click="togglePopover"
                  :class="{
                    'w-[127px] h-[38px]': !startDate,
                  }"
                >
                  {{ formattedStartDate }}
                </button>
                <button
                  class="px-3 py-2 rounded-xl bg-white border-[#CECECE] border border-solid"
                  @click="togglePopover"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/img/IDCalendar.png"
                    alt="IDCalendar"
                  />
                </button>
              </div>
            </template>
          </VDatePicker>
          <p>~</p>
          <VDatePicker v-model="endDate">
            <template #default="{ togglePopover }">
              <div class="flex items-center gap-2">
                <button
                  class="px-10 py-2.5 text-[#797979] rounded-xl text-xs font-light bg-white border-[#CECECE] border border-solid"
                  :class="{
                    'w-[127px] h-[38px]': !endDate,
                  }"
                  @click="togglePopover"
                >
                  {{ formattedEndDate }}
                </button>
                <button
                  class="px-3 py-2 rounded-xl bg-white border-[#CECECE] border border-solid"
                  @click="togglePopover"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/img/IDCalendar.png"
                    alt="IDCalendar"
                  />
                </button>
              </div>
            </template>
          </VDatePicker>
        </div>
        <div class="flex gap-[20px] items-center font-bold">
          <p class="w-[50px]">검색어</p>
          <AppDropdown
            :objectOptions="options2"
            :startText="selectedOption2"
            :openFull="true"
            @update:selectedOption="handleSelection2"
          />
          <input
            class="py-2 px-4 border border-gray-300 bg-white rounded-md text-sm"
            type="text"
            placeholder="검색어를 입력하세요."
            v-model="searchText"
          />
          <AdminButton :text="'검색'" :isWhite="false" @onClick="fetchList" />
        </div>
      </div>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminPagination from '@/components/admin/AdminPagination.vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  name: 'adminManageView',
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
    const page = ref(1);
    const limit = ref(10);
    const totalCount = ref();
    const options = ref(['최신순', '오래된순']);
    const selectedOption = ref('최신순');

    const searchText = ref('');
    const options2 = ref([
      {
        name: '선택',
        value: '',
      },
      {
        name: '아이디',
        value: 'id',
      },
      {
        name: '이름',
        value: 'name',
      },
      {
        name: '회원구분',
        value: 'userRole',
      },
      {
        name: '핸드폰번호',
        value: 'phoneNumber',
      },
      {
        name: '이메일',
        value: 'userEmail',
      },
    ]);
    const selectedOption2 = ref('선택');
    const valueOption2 = ref('');
    const header = ref([
      {
        text: '순서',
      },
      {
        text: '등록일',
      },
      {
        text: '회원구분',
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
        text: '핸드폰번호',
      },
      {
        text: '이메일',
      },
      {
        text: '관리',
      },
    ]);
    const body = ref([]);

    onMounted(() => {
      fetchList();
    });

    const parseDate = (d) => {
      if (!d) return '';
      const tmp = new Date(d);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      month = String(month).padStart(2, '0');
      day = String(day).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const handleSelection1 = (v) => {
      selectedOption.value = v;
      fetchList();
    };
    const handleSelection2 = (v) => {
      valueOption2.value = v;
    };

    const startDate = ref();
    const formattedStartDate = computed(() => {
      if (!startDate.value) return '';
      const tmp = new Date(startDate.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });

    const endDate = ref();
    const formattedEndDate = computed(() => {
      if (!endDate.value) return '';
      const tmp = new Date(endDate.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });

    const goUpdate = (id) => {
      router.push({
        name: 'adminManageUpate',
        query: {
          id,
        },
      });
    };

    const doDelete = async (id) => {
      await AdminService.userDelete(id);

      alert('삭제되었습니다.');
      location.reload(true);
    };

    const updatePage = (v) => {
      console.log(v);
      page.value = v;
      fetchList();
    };

    const fetchList = async () => {
      const requestData = {
        pageNo: page.value,
        limit: limit.value,
        orderBy: selectedOption.value === '오래된순' ? 'asc' : 'desc',
        startDate: parseDate(startDate.value),
        endDate: parseDate(endDate.value),
      };
      if (valueOption2.value && searchText.value) {
        requestData[valueOption2.value] = searchText.value;
      }
      const userManagement = await AdminService.userManagement(
        'admin',
        requestData
      );
      const resData = userManagement.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }
      console.log(resData);
      const list = resData.adminUserInfoList;
      totalCount.value = resData.totalCount;
      body.value = [];

      for (const i in list) {
        const v = list[i];

        body.value.push([
          {
            text: parseInt(i) + (page.value - 1) * 10 + 1 + '',
          },
          {
            text: v.createAt.split(' ')[0],
          },
          {
            text: v.userRole,
          },
          {
            text: v.userSpaceOrgInfo,
          },
          {
            text: v.name,
          },
          {
            text: v.id,
          },
          {
            text: v.phoneNumber,
          },
          {
            text: v.userEmail,
          },
          {
            isEditWidthDelete: true,
            id: v.uniqId,
          },
        ]);
      }
    };

    return {
      header,
      body,
      options,
      selectedOption,
      startDate,
      formattedStartDate,
      endDate,
      formattedEndDate,
      searchText,
      options2,
      selectedOption2,
      page,
      totalCount,

      handleSelection1,
      handleSelection2,

      goUpdate,
      doDelete,
      updatePage,
      fetchList,
    };
  },
};
</script>

<style scoped></style>
