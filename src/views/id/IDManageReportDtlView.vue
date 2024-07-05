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
        :placeholder="'학교명을 입력해주세요.'"
        />
      </div>
      <div class="flex justify-end w-full">
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
      :pageNo=19
      :recordCount=5
      :totalCount=100
      />
      <IDButton class="bg-gray-300"
      @click="goReportList"
      :text="'목록으로'"
      :isGray="true"
      :_width="160"
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
import IDButton from '@/components/id/IDButton.vue';
import { onMounted } from 'vue';

export default {
  name: 'IDManageReportDtlView',
  components: {
    IDTable,
    AppDropdown,
    IDPagination,
    IDSearch,
    IDButton
},
  setup() {
    const router = useRouter();
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

    onMounted(() => {
      fetchReportDtlList();
    });

    const handleSelection1 = (v) => {
      console.log(v);
    };

    const fetchReportDtlList = async () => {
      const reportReponse = await IDService.getReportsDtl('QES00000000000000001', {
        searchKeyword : '경남시범초',
        schulGradeCode : '',
        stGrade : '5',
        pageNo : 1,
        recordCount : 10,
      });
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

    const goReportList = () => {
      router.push({ name: 'IDManageReportView' })
    }

    return {
      options,
      selectedOption,
      options2,
      selectedOption2,
      pollNm,
      header,
      body,

      handleSelection1,
      fetchReportDtlList,
      downloadExcel,
      goReportList
    };
  },
};
</script>

<style scoped></style>
