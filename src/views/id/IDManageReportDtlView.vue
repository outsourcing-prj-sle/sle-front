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
      :_body="body"
      />
      <IDPagination
      :pageNo=pageNo
      :recordCount=recordCount
      :totalCount=totalCount
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
import { ref, onBeforeMount, computed } from 'vue';
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
    const header = computed(() => {
      return [
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
        ...headerArr.value
      ];
    });
    const headerArr = ref([]);
    const body = ref([]);

    const pageNo = ref(1);
    const recordCount = ref(10);
    const totalCount = ref(0);

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
        pageNo : pageNo.value,
        recordCount : recordCount.value,
      });
      const resData = reportReponse.data;
      console.log(resData);

      pageNo.value = resData.pageNo;
      recordCount.value = resData.recordCount;
      totalCount.value = resData.totalCount;

      let result = [];
      let answerArr = [];
      resData.pollDtlList.map((item, idx) => {
        let arr = [
          { isCheckbox: true },
          { text: idx+1 },
          { text: item.schulNm },
          { text: item.stGrade },
          { text: item.userNm },
          { text: (item.sexdstn === 'F' ? '여' : '남') },
          { text: item.brthy?.substring(0,4) + '-' + item.brthy?.substring(4,6)},
          { text: 'test@gne.go.kr' },
        ]

        item.answer.map((subItem, index) => {
          arr.push({ text: subItem });
          if(idx === 0) answerArr.push({ text: `EK1.${index+1}` });
        });

        result.push(arr);
      });

      body.value = result;
      headerArr.value = answerArr;
      console.log(body.value);
      console.log(headerArr.value);
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
      headerArr,
      body,
      pageNo,
      recordCount,
      totalCount,

      handleSelection1,
      fetchReportDtlList,
      downloadExcel,
      goReportList
    };
  },
};
</script>

<style scoped></style>
