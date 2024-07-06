<template>
  <div class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]">
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">연구소관리자 관리</p>
      <div class="flex flex-col items-start w-full bg-gray-100 border border-gray-300 rounded-xl p-[20px] gap-[20px] text-sm">
        <div class="flex gap-[20px] items-center font-bold">
          <p class="w-[40px]">기간</p>
          <VDatePicker v-model="startDate">
            <template #default="{ togglePopover }">
              <div class="flex items-center gap-2">
                <button
                  class="px-10 py-2.5 text-[#797979] rounded-xl text-xs font-light bg-white border-[#CECECE] border border-solid"
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
          <p class="w-[40px]">검색어</p>
          <AppDropdown
            :options="options"
            :startText="selectedOption"
            :openFull="true"
            @update:selectedOption="handleSelection1"
          />
          <input class="py-2 px-4 border border-gray-300 bg-white rounded-md text-sm" type="text" placeholder="검색어를 입력하세요.">
          <IDButton
            :text="'검색'"
            :isWhite="false"
          />
        </div>
      </div>
      <IDTable
      :header="header"
      :body="body"
      />
      <IDPagination
      :pageNo=1
      :recordCount=10
      :totalCount=12
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
import IDTable from '@/components/id/IDTable.vue'
import AppDropdown from '@/components/AppDropdown.vue'
import IDPagination from '@/components/id/IDPagination.vue';
import IDButton from '@/components/id/IDButton.vue';

export default {
  name: 'IDManageResearchView',
  components: {
    IDTable,
    AppDropdown,
    IDPagination,
    IDButton
},
  setup() {
    const router = useRouter();
    const options = ref([123, 456]);
    const selectedOption = ref('선택');
    const header = [
      {
        isCheckbox: true
      },
      {
        text: '번호'
      }, 
      {
        text: '등록일'
      }, 
      {
        text: '회원구분'
      }, 
      {
        text: '소속'
      }, 
      {
        text: '이름'
      }, 
      {
        text: '아이디'
      },
      {
        text: '핸드폰번호'
      },
      {
        text: '이메일'
      },
      {
        text: '관리'
      },
    ];
    const body = [
      [
        { isCheckbox: true },
        { text: 1 },
        { text: '2024-03-02' },
        { text: '연구소관리자' },
        { text: 'ID연구소' },
        { text: '홍길동' },
        { text: '1345632' },
        { text: '010-0000-0000' },
        { text: '13213@gne.go.kr' },
        { isButton2: true },
      ]
    ];

    const handleSelection1 = (v) => {
      console.log(v);
    };

    onMounted(() => {
      fetchResearchList();
    });

    const fetchResearchList = async () => {
      const reportReponse = await IDService.getResearchAdmin({ 
        pageNo: 1, 
        recordCount: 10,
        searchBeginDate: '',
        searchEndDate: '',
        searchType: '',
        searchKeyword: '',
      });
      const resData = reportReponse.data;
      console.log(resData);
    }

    const goInsertResearchVw = () => {
      router.push({ name: 'IDManageResearchInsertView' })
    }

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

    return {
      options,
      selectedOption,
      header,
      body,
      startDate,
      formattedStartDate,
      endDate,
      formattedEndDate,

      handleSelection1,
      fetchResearchList,
      goInsertResearchVw
    };
  },
};
</script>

<style scoped></style>