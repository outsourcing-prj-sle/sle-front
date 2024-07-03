<template>
  <div class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]">
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">설문관리 > {{ pollNm }}</p>
      <div class="flex justify-between items-center w-full">
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
        <IDSearch
        :keyword="test"
        :placeholder="test"
        />
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
import IDPagination from '@/components/id/IDPagination.vue';
import IDSearch from '@/components/id/IDSearch.vue';

export default {
  name: 'IDManageReportDtlView',
  components: {
    IDTable,
    AppDropdown,
    IDPagination,
    IDSearch
},
  setup() {
    const options = ref([123, 456]);
    const selectedOption = ref('학교급');
    const options2 = ref([123, 456]);
    const selectedOption2 = ref('학년');
    const pollNm = ref("마음알기 설문1 상세");
    const header = [
      {
        isCheckbox: true
      },
      {
        text: '번호'
      }, 
      {
        text: '학교'
      }, 
      {
        text: '학년'
      }, 
      {
        text: '이름'
      }, 
      {
        text: '성별'
      }, 
      {
        text: '생년-월'
      },
      {
        text: '계정'
      },
      {
        text: 'EK1.1'
      },
      {
        text: 'EK1.2'
      },
      {
        text: 'EK1.3'
      },
      {
        text: 'EK1.4'
      },
      {
        text: 'EK1.5'
      },
      {
        text: 'EK1.6'
      },
    ];
    const body = [
      [
        { isCheckbox: true },
        { text: 1 },
        { text: '이작초등학교' },
        { text: '3' },
        { text: '홍길동' },
        { text: '남' },
        { text: '2014-09' },
        { text: 'test@gne.go.kr' },
        { text: 3 },
        { text: 1 },
        { text: 1 },
        { text: 2 },
        { text: 4 },
        { text: 1 }
      ]
    ];

    const handleSelection1 = (v) => {
      console.log(v);
    };

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      pollNm,
      header,
      body,

      handleSelection1
    };
  },
};
</script>

<style scoped></style>
