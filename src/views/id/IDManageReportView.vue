<template>
  <IDPopup
  />
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
      <IDTableDtl
      :header="header"
      :body="body"
      @onClick="goReportDtl"
      />
      <IDPagination
      :pageNo=pageNo
      :recordCount=recordCount
      :totalCount=totalCount
      />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';
import IDTableDtl from '@/components/id/IDTableDtl.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import { onMounted } from 'vue';
import router from '@/router';
import IDPagination from '@/components/id/IDPagination.vue';
import IDPopup from '@/components/id/IDPopup.vue';
import { _mixDate } from '@/utils/utils.js';

export default {
  name: 'IDManageReportView',
  components: {
    IDTableDtl,
    AppDropdown,
    IDPopup,
    IDPagination
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
    const body = ref([]);

    const pageNo = ref(1);
    const recordCount = ref(10);
    const totalCount = ref(0);

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

      pageNo.value = resData.pageNo;
      recordCount.value = resData.recordCount;
      totalCount.value = resData.totalCount;

      let result = [];
      resData.pollList.map((item, idx) => {
        let arr = [
          { isCheckbox: true },
          { text: idx+1 },
          { text: item.pollNm },
          { text: '관리>설정을 해주세요.' },
          { text: (item.pollBgnde !== '' &&  item.pollEndde !== '') ? _mixDate(item.pollBgnde, item.pollEndde) : '관리>설정을 해주세요.'},
        ]

        if(item.pollTarget.length) {
          arr.push({ isButton: '상세보기' });
        } else {
          arr.push({ text: '-' });
        }
        arr.push({ isOpenPopup: true });

        result.push(arr);
      });

      body.value = result;
      console.log(body.value);
    }

    const goReportDtl = () => {
      router.push({ name: 'IDManageReportDtlView' })
    };

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      header,
      body,
      pageNo,
      recordCount,
      totalCount,

      handleSelection1,
      fetchReportList,
      goReportDtl
    };
  },
};
</script>

<style scoped>
</style>