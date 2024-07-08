<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">사회정서학습</p>
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-[20px]">
          <AppDropdown
            :objectOptions="options"
            :startText="selectedOption"
            :openMax="true"
            :openWay="'left'"
            @update:selectedOption="handleSelection1"
          />
          <AppDropdown
            :options="options2"
            :startText="selectedOption2"
            :openFull="true"
            @update:selectedOption="handleSelection2"
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
      <IDTable :header="header" :_body="body" />
      <IDPagination
        :pageNo="pageNo"
        :recordCount="10"
        :totalCount="totalCount"
        @updatePage="updatePage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';
import IDTable from '@/components/id/IDTable.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import IDPagination from '@/components/id/IDPagination.vue';

export default {
  name: 'IDManageSelView',
  components: {
    IDTable,
    AppDropdown,
    IDPagination,
  },
  setup() {
    const options = ref([
      {
        name: '학교',
        value: '',
      },
    ]);
    const selectedOption = ref('학교');
    const valueOption = ref('');

    const options2 = ref(['최신순', '오래된순']);
    const selectedOption2 = ref('최신순');
    const header = ref([
      {
        isCheckbox: true,
      },
      {
        text: '번호',
      },
      {
        text: '학교명',
      },
      {
        text: '교사명',
      },
      {
        text: '담당 학년-반',
      },
      {
        text: 'Q1_1',
      },
      {
        text: 'Q1_2',
      },
      {
        text: 'Q1_3',
      },
    ]);
    const body = ref([]);

    const pageNo = ref(1);
    const recordCount = ref(10);
    const totalCount = ref(0);

    onMounted(() => {
      fetchIdttList();
      fetchSchList();
    });

    const fetchSchList = async () => {
      const getMySchList = await IDService.getMySchList();
      const resData = getMySchList.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      console.log(resData);
      options.value = [
        {
          name: '학교',
          value: '',
        },
      ];
      if (!resData.length) return;
      for (const i in resData) {
        options.value.push({
          name: resData[i].schulNm,
          value: resData[i].schulCode,
        });
      }
    };

    const handleSelection1 = (v) => {
      valueOption.value = v;
      fetchIdttList();
    };

    const handleSelection2 = (v) => {
      selectedOption2.value = v;
      fetchIdttList();
    };

    const fetchIdttList = async () => {
      const reportReponse = await IDService.getIdtt('SE', {
        pageNo: pageNo.value,
        recordCount: 10,
        orderBy: selectedOption.value === '오래된순' ? 'asc' : 'desc',
        schulCode: valueOption.value,
      });
      const resData = reportReponse.data;
      console.log(resData);

      pageNo.value = resData.pageNo;
      recordCount.value = resData.recordCount;
      totalCount.value = resData.totalCount;

      let result = [];
      resData.idttList.map((item, idx) => {
        let arr = [
          { isCheckbox: true },
          { text: idx + 1 },
          { text: item.schulNm },
          { text: item.userNm },
          { text: item.userSpaceOrgInfo },
        ];

        item.qesAnswer.map((subItem) => {
          arr.push({ text: subItem });
        });

        result.push(arr);
      });

      body.value = result;
      console.log(body.value);
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
        aEl.setAttribute('download', `${new Date()}_managesel.csv`);
        aEl.style.display = 'none';
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
      } else {
        alert('데이터가 없습니다');
      }
    };

    const updatePage = (v) => {
      pageNo.value = v;
      fetchIdttList();
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

      fetchIdttList,
      downloadExcel,
      updatePage,
      handleSelection2,
      handleSelection1,
    };
  },
};
</script>

<style scoped></style>
