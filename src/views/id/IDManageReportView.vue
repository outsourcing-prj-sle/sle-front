<template>
  <div class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]">
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">설문관리</p>
      <div class="flex items-center gap-[20px]">
        <AppDropdown
          :options="options"
          :startText="selectedOption"
          :openFull="true"
          @update:selectedOption="handleSelection1"
        />
        <AppDropdown
          :options="options2"
          :startText="selectedOption2"
          :openFull="true"
          @update:selectedOption="handleSelection1"
        />
      </div>
      <IDTable
      :header="header"
      :body="body"
      />
      <div class="flex justify-center gap-[10px]">
        <div>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';
import IDTable from '@/components/id/IDTable.vue'
import AppDropdown from '@/components/AppDropdown.vue'
import { onMounted } from 'vue';

export default {
  name: 'IDManageReportView',
  components: {
    IDTable,
    AppDropdown,
  },
  setup() {
    const options = ref([123, 456]);
    const selectedOption = ref('대상');
    const options2 = ref([123, 456]);
    const selectedOption2 = ref('정렬');
    const header = [
      {
        isCheckbox: true
      },
      {
        text: '번호'
      }, 
      {
        text: '활동명'
      }, 
      {
        text: '대상'
      }, 
      {
        text: '기간'
      }, 
      {
        text:'상세'
      }, 
      {
        text:'관리'
      }
    ];
    const body = [
      [
        { isCheckbox: true },
        { text: 1 },
        { text: '마음알기 설문1' },
        { text: '관리>설정을 해주세요.' },
        { text: '관리>설정을 해주세요.' },
        { text: '-' },
        { isOpenPopup: true }
      ],
      [
        { isCheckbox: true },
        { text: 2 },
        { text: '마음알기 설문2' },
        { text: '초3, 초4, 초5, 초6, 경남중학교, 경남시범초등학교'},
        { text: '2023년 1월 1일 ~ 3월 1일까지' },
        { isButton: '상세보기' },
        { isOpenPopup: true }
      ],
      [
        { isCheckbox: true },
        { text: 3 },
        { text: '마음알기 설문3' },
        { text: '초3, 초4, 초5, 초6' },
        { text: '2023년 1월 1일 ~ 4월 1일까지' },
        { isButton: '상세보기' },
        { isOpenPopup: true }
      ]
    ];

    onMounted(() => {
      fetchReportList();
    });

    const handleSelection1 = (v) => {
      console.log(v);
    };

    const fetchReportList = async () => {
      const reportReponse = await IDService.getReports({
        pageNo : 1,
        recordCount : 10,
        searchBeginDate : '20240501',
        searchEndDate : '20240901',
        searchType : '01', // 01:회원구분, 02:소속, 03:이름, 04:아이디, 05:핸드폰번호, 06:이메일
        searchKeyword : '연구소관리자'
      });
      const resData = reportReponse.data;
      console.log(resData);
    }

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      header,
      body,

      handleSelection1,
      fetchReportList
    };
  },
};
</script>

<style scoped></style>
