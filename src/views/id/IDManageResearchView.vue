<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">연구소관리자 관리</p>
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
                  :class="{
                    'w-[127px] h-[38px]': !startDate,
                  }"
                  @click="togglePopover"
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
            :objectOptions="options"
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
          <IDButton
            :text="'검색'"
            :isWhite="false"
            @onClick="fetchResearchList"
          />
        </div>
      </div>
      <div class="text-xs font-medium content-center">
          총 {{ totalCount }}개 | 현재페이지 {{ pageNo }}
        </div>
      <IDTable
        :header="header"
        :_body="body"
        @goUpdate="goUpdate"
        @userDeleted="fetchResearchList"
      />
      <IDPagination
        :pageNo="pageNo"
        :recordCount="10"
        :totalCount="totalCount"
        @updatePage="updatePage"
      />
      <div class="w-full flex justify-end">
        <IDButton
          @onClick="goInsertResearchVw"
          :text="'등록'"
          :isWhite="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';
import IDTable from '@/components/id/IDTable.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import IDPagination from '@/components/id/IDPagination.vue';
import IDButton from '@/components/id/IDButton.vue';

export default {
  name: 'IDManageResearchView',
  components: {
    IDTable,
    AppDropdown,
    IDPagination,
    IDButton,
  },
  setup() {
    const router = useRouter();
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
    const header = [
      {
        text: '번호',
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
    ];
    const body = ref([]);

    const pageNo = ref(1);
    const recordCount = ref(10);
    const totalCount = ref(30);

    const handleSelection1 = (v) => {
      valueOption.value = v;
    };

    onMounted(() => {
      fetchResearchList();
    });

    const parseDate = (d) => {
      if (!d) return '';
      const tmp = new Date(d);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      month = String(month).padStart(2, '0');
      day = String(day).padStart(2, '0');
      return `${year}${month}${day}`;
    };

    const fetchResearchList = async () => {
      const requestData = {
        pageNo: pageNo.value,
        recordCount: recordCount.value,
        searchBeginDate: parseDate(startDate.value),
        searchEndDate: parseDate(endDate.value),
        searchType: valueOption.value,
        searchKeyword: valueOption.value ? searchText.value : '',
      };
      const reportReponse = await IDService.getResearchAdmin(requestData);
      const resData = reportReponse.data;
      console.log(resData);

      pageNo.value = resData.pageNo;
      recordCount.value = resData.recordCount;
      totalCount.value = resData.totalCount;
      console.log(pageNo.value, recordCount.value, totalCount.value);

      let result = [];
      resData.userInfoList.map((item, idx) => {
        let arr = [
          { text: ((idx+1) + (pageNo.value-1) * 10) },
          { text: item.frstRegistPnttm },
          { text: item.userSeCode },
          { text: item.userSpaceInfo },
          { text: item.userNm },
          { text: item.userId },
          { text: item.phoneNumber },
          { text: item.emailAdres },
          { isButton2: true, uniqId: item.uniqId },
        ];

        result.push(arr);
      });

      body.value = result;
      console.log(body.value);
    };

    const goInsertResearchVw = () => {
      router.push({ name: 'IDManageResearchInsertView' });
    };

    const startDate = ref();
    const formattedStartDate = computed(() => {
      if (!startDate.value) return '';
      const tmp = new Date(startDate.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      month = String(month).padStart(2, '0');
      day = String(day).padStart(2, '0');
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
      month = String(month).padStart(2, '0');
      day = String(day).padStart(2, '0');
      const format = `${year}-${month}-${day}`;

      return format;
    });

    const goUpdate = (v) => {
      router.push({
        name: 'IDManageResearchInsertView',
        query: {
          id: v,
        },
      });
    };

    const updatePage = (v) => {
      pageNo.value = v;
      fetchResearchList();
    };

    return {
      options,
      selectedOption,
      header,
      body,
      startDate,
      formattedStartDate,
      endDate,
      formattedEndDate,
      pageNo,
      recordCount,
      totalCount,
      searchText,

      handleSelection1,
      fetchResearchList,
      goInsertResearchVw,
      goUpdate,
      updatePage,
    };
  },
};
</script>

<style scoped></style>
