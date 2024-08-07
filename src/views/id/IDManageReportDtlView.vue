<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        설문관리 > {{ pollNm }} 상세
      </p>
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-[20px]">
          <AppDropdown
            :objectOptions="options1"
            :startText="selectedOption1"
            :openFull="true"
            @update:selectedOption="handleSelection1"
          />
          <AppDropdown
            :objectOptions="options2"
            :startText="selectedOption2"
            :updateText="updateText2"
            :openFull="true"
            @update:selectedOption="handleSelection2"
          />
        </div>
        <IDSearch
          v-model="searchText"
          :placeholder="'학교명을 입력해주세요.'"
          @keyup.enter="searchSch"
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
      <div class="text-xs font-medium content-center">
        총 {{ totalCount }}개 | 현재페이지 {{ page }}
      </div>
      <IDTable :header="header" :_body="body" />
      <IDPagination
        :pageNo="page"
        :recordCount="10"
        :totalCount="totalCount"
        @updatePage="updatePage"
      />
      <IDButton
        class="bg-gray-300"
        @click="goReportList"
        :text="'목록으로'"
        :isGray="true"
        :_width="160"
      />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';
import IDTable from '@/components/id/IDTable.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import IDPagination from '@/components/id/IDPagination.vue';
import IDSearch from '@/components/id/IDSearch.vue';
import IDButton from '@/components/id/IDButton.vue';

export default {
  name: 'IDManageReportDtlView',
  components: {
    IDTable,
    AppDropdown,
    IDPagination,
    IDSearch,
    IDButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pollId = ref(route.query.id);
    const searchText = ref();
    const searchTextComplete = ref();
    const options1 = ref([
      {
        name: '학교급',
        value: '',
      },
      {
        name: '초등학교',
        value: 'SCH_02',
      },
      {
        name: '중학교',
        value: 'SCH_03',
      },
      {
        name: '고등학교',
        value: 'SCH_04',
      },
    ]);

    const selectedOption1 = ref('학교급');
    const valueOption1 = ref('');
    const options2 = ref([
      {
        name: '학년',
        value: '',
      },
      {
        name: '1학년',
        value: '1',
      },
      {
        name: '2학년',
        value: '2',
      },
      {
        name: '3학년',
        value: '3',
      },
      {
        name: '4학년',
        value: '4',
      },
      {
        name: '5학년',
        value: '5',
      },
      {
        name: '6학년',
        value: '6',
      },
    ]);
    const selectedOption2 = ref('학년');
    const valueOption2 = ref('');
    const updateText2 = ref();
    const pollNm = ref();
    const pollNo = computed(() => {
      return String(pollNm.value).charAt(pollNm.value.length-1);
    });
    const header = computed(() => {
      return [
        {
          text: '번호',
        },
        {
          text: '학교',
        },
        {
          text: '학년',
        },
        {
          text: '이름',
        },
        {
          text: '성별',
        },
        {
          text: '생년-월',
        },
        {
          text: '계정',
        },
        ...headerArr.value,
      ];
    });
    const headerArr = ref([]);
    const body = ref([]);

    const page = ref(1);
    const recordCount = ref(10);
    const totalCount = ref(0);

    onMounted(() => {
      fetchReportDtlList();
    });

    const handleSelection1 = (v) => {
      valueOption1.value = v;
      if (v === '' || v === 'SCH_02') {
        options2.value = [
          {
            name: '학년',
            value: '',
          },
          {
            name: '1학년',
            value: 'GRADE01',
          },
          {
            name: '2학년',
            value: 'GRADE02',
          },
          {
            name: '3학년',
            value: 'GRADE03',
          },
          {
            name: '4학년',
            value: 'GRADE04',
          },
          {
            name: '5학년',
            value: 'GRADE05',
          },
          {
            name: '6학년',
            value: 'GRADE06',
          },
        ];
      } else {
        options2.value = [
          {
            name: '학년',
            value: '',
          },
          {
            name: '1학년',
            value: 'GRADE01',
          },
          {
            name: '2학년',
            value: 'GRADE02',
          },
          {
            name: '3학년',
            value: 'GRADE03',
          },
        ];
      }
      updateText2.value = '0';
      setTimeout(() => {
        updateText2.value = null;
      }, 250);
      fetchReportDtlList();
    };

    const handleSelection2 = (v) => {
      console.log(v);
      valueOption2.value = v;
      fetchReportDtlList();
    };

    const fetchReportDtlList = async () => {
      console.log({
        searchKeyword: searchTextComplete.value,
        schulGradeCode: valueOption1.value,
        stGrade: valueOption2.value,
        pageNo: page.value,
        recordCount: recordCount.value,
      });
      const reportReponse = await IDService.getReportsDtl(pollId.value, {
        searchKeyword: searchTextComplete.value,
        schulGradeCode: valueOption1.value,
        stGrade: valueOption2.value,
        pageNo: page.value,
        recordCount: recordCount.value,
      });
      const resData = reportReponse.data;
      console.log(resData);

      totalCount.value = resData.totalCount;
      const num = pollId.value[pollId.value.length - 1];
      pollNm.value = '마음알기 설문' + num;

      let result = [];
      let answerArr = [];
      resData.pollDtlList.map((item, idx) => {
        let arr = [
          { text: ((idx+1) + (page.value-1) * 10) },
          { text: item.schulNm },
          { text: item.stGrade },
          { text: item.userNm },
          { text: item.sexdstn === 'F' ? '여' : '남' },
          {
            text:
              item.brthy?.substring(0, 4) + '-' + item.brthy?.substring(4, 6),
          },
          { text: 'test@gne.go.kr' },
        ];

        item.answer.map((subItem, index) => {
          arr.push({ text: subItem });
          if (idx === 0) answerArr.push({ text: `EK${pollNo.value}.${index + 1}` });
        });

        result.push(arr);
      });

      body.value = result;
      headerArr.value = answerArr;
    };

    const downloadExcel = () => {
      if (body.value.length) {
        const titleArr = [];
        const infoArr = [];
        for (const i in header.value) {
          if (header.value[i].text) {
            titleArr.push(header.value[i].text);
          }
        }
        for (const i in body.value) {
          const tmpAry = [];
          for (const j in body.value[i]) {
            if (header.value[j].text) {
              tmpAry.push(body.value[i][j].text);
            }
          }
          infoArr.push(tmpAry);
        }

        const aEl = document.createElement('a');
        let text = '\uFEFF';
        text += titleArr.join(',') + '\n';
        infoArr.forEach((info) => {
          text += info.join(',');
          text += '\n';
        });
        aEl.setAttribute(
          'href',
          `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
        );
        aEl.setAttribute('download', `${new Date()}_${pollNm.value}.csv`);
        aEl.style.display = 'none';
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
      } else {
        alert('데이터가 없습니다');
      }
    };

    const goReportList = () => {
      router.push({ name: 'IDManageReportView' });
    };

    const searchSch = () => {
      searchTextComplete.value = searchText.value;
      fetchReportDtlList();
    };

    const updatePage = (v) => {
      page.value = v;
      fetchReportDtlList();
    };

    return {
      pollId,
      options1,
      selectedOption1,
      options2,
      selectedOption2,
      updateText2,
      pollNm,
      pollNo,
      header,
      headerArr,
      body,
      page,
      recordCount,
      totalCount,
      searchText,

      handleSelection1,
      handleSelection2,
      fetchReportDtlList,
      downloadExcel,
      goReportList,
      searchSch,
      updatePage,
    };
  },
};
</script>

<style scoped></style>
