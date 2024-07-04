<template>
  <div class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]">
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">학습성향</p>
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
        <div class="text-blue-500 cursor-pointer" @click="downloadExcel">
          <img
            class="h-[38px]"
            src="@/assets/img/btn_excel_download.png"
            alt="엑셀_다운로드"
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
import { onMounted } from 'vue';

export default {
  name: 'IDManageLtView',
  components: {
    IDTable,
    AppDropdown,
    IDPagination,
},
  setup() {
    const options = ref([123, 456]);
    const selectedOption = ref('학교');
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
        text: '학교명'
      }, 
      {
        text: '교사명'
      }, 
      {
        text: '담당 학년-반'
      }, 
      {
        text: 'Q1_1'
      }, 
      {
        text: 'Q1_2'
      },
      {
        text: 'Q1_3'
      },
    ];
    const body = [
      [
        { isCheckbox: true },
        { text: 1 },
        { text: '이작초등학교' },
        { text: '김톡톡' },
        { text: '3-01' },
        { text: '1' },
        { text: '2, 3' },
        { text: '더 다양한 종류의 분석을 통하여 다양한 자료를 함께 볼 수 있었으면 좋겠습니다.' },
      ]
    ];

    const handleSelection1 = (v) => {
      console.log(v);
    };

    onMounted(() => {
      fetchIdttList();
    });

    const fetchIdttList = async () => {
      const reportReponse = await IDService.getIdtt('LT', { pageNo: 2, recordCount: 10 });
      const resData = reportReponse.data;
      console.log(resData);
    }

    const downloadExcel = () => {
      // if (infoArr.value.length) {
      //   const aEl = document.createElement('a');

      //   let text = '\uFEFF';
      //   text += titleArr.value.join(',') + '\n';

      //   infoArr.value.forEach((info) => {
      //     text += [info.name, info.email, info.grade, info.gender].join(',');
      //     if (selectedReport.value === all.value) {
      //       for (let i in titleReportArr.value) {
      //         text += info.stateList[i + 1 + '']
      //           ? ',' + t('sel.ing')
      //           : ',' + t('sel.non_ing');
      //       }
      //     } else {
      //       text += info.stateList[currentNum.value]
      //         ? ',' + t('sel.ing')
      //         : ',' + t('sel.non_ing');
      //     }
      //     text += '\n';
      //   });

      //   aEl.setAttribute(
      //     'href',
      //     `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
      //   );

      //   aEl.setAttribute('download', `${new Date()}_SEL.csv`);

      //   aEl.style.display = 'none';
      //   document.body.appendChild(aEl);
      //   aEl.click();
      //   document.body.removeChild(aEl);
      // } else {
      //   alert(t('sel.no_data'));
      // }
    };

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      header,
      body,

      handleSelection1,
      fetchIdttList,
      downloadExcel
    };
  },
};
</script>

<style scoped></style>
