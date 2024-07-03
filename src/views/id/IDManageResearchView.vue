<template>
  <div class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]">
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">연구소관리자 관리</p>
      <div class="flex flex-col items-start w-full bg-gray-100 border border-gray-300 rounded-xl p-[20px] gap-[20px]">
        <div class="flex gap-[20px] items-center font-bold">
          <p>기간</p>
        </div>
        <div class="flex gap-[20px] items-center font-bold">
          <p>검색어</p>
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
        { button1: 't1', button2: 't2'},
      ]
    ];

    const handleSelection1 = (v) => {
      console.log(v);
    };

    return {
      options,
      selectedOption,
      header,
      body,

      handleSelection1,
    };
  },
};
</script>

<style scoped></style>
