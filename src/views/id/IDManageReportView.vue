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
      :headers="headers"
      :bodies="bodies"
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
    const headers = ['번호', '활동명', '대상', '기간', '상세', '관리'];
    const bodies = [
      {
        nttNo: 1,
        pollId: 'QES0000000001',
        pollNm: '마음알기 설문1',
        pollTarget: '',
        date: '',
        dtl: false,
      },
      {
        nttNo: 2,
        pollId: 'QES0000000002',
        pollNm: '마음알기 설문2',
        pollTarget: '초3, 초4, 초5, 초6, 경남중학교, 경남시범초등학교',
        date: '2023년 1월 1일' + ' ~ ' + '3월 1일' + '까지',
        dtl: true,
      },
      {
        nttNo: 3,
        pollId: 'QES0000000003',
        pollNm: '마음알기 설문3',
        pollTarget: '초3, 초4, 초5, 초6',
        date: '2023년 1월 1일' + ' ~ ' + '4월 1일' + '까지',
        dtl: true,
      }
    ];

    const handleSelection1 = (v) => {
      console.log(v);
    };

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      headers,
      bodies,

      handleSelection1
    };
  },
};
</script>

<style scoped></style>
