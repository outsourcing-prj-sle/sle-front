<template>
  <IDPopup v-if="popupReport" :metadata="originList[popupReport]" />
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">설문관리</p>
      <div class="flex items-center gap-[20px]">
        <AppDropdown
          v-if="startOption1"
          :options="options1"
          :startText="startOption1"
          :openFull="true"
          @update:selectedOption="handleSelection1"
        />
        <AppDropdown
          :objectOptions="options2"
          :startText="startOption2"
          :openFull="true"
          @update:selectedOption="handleSelection2"
        />
      </div>
      <IDTableDtl :header="header" :body="body" @onClick="goReportDtl" />
      <IDPagination
        :pageNo="pageNo"
        :recordCount="recordCount"
        :totalCount="totalCount"
      />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import { useStateStore } from '@/store/stateStore.js';
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
    IDPagination,
  },
  setup() {
    const rank = { 전체: 0, 초: 1, 중: 2, 고: 3 };
    const stateStore = useStateStore();
    const popupReport = computed(() => stateStore?.popupReport || '0');
    const originList = ref([]);
    const options1 = ref(['전체']);
    const startOption1 = ref();
    const selectedValue1 = ref();
    const filterOption1 = ref([]); // 대상 선택 시 index 기준으로 설문 보여줄지말지  비교할꺼
    const options2 = ref([
      { name: '오름차순', value: 'asc' },
      { name: '내림차순', value: 'desc' },
    ]);
    const startOption2 = ref('오름차순');
    const selectedValue2 = ref('asc');
    const header = ref([
      {
        isCheckbox: true,
      },
      {
        text: '번호',
      },
      {
        text: '활동명',
      },
      {
        text: '대상',
      },
      {
        text: '기간',
      },
      {
        text: '상세',
      },
      {
        text: '관리',
      },
    ]);
    const body = ref([]);

    const pageNo = ref(1);
    const recordCount = ref(10);
    const totalCount = ref(0);

    onMounted(() => {
      fetchReportList();
    });

    const handleSelection1 = (v) => {
      selectedValue1.value = v;
      selectBody(v);
    };

    const selectBody = (v) => {
      for (let i in body.value) {
        body.value[i][0].disable = false;
        if (v !== '전체' && !filterOption1[i]?.includes(v)) {
          body.value[i][0].disable = true;
        }
      }
    };

    const handleSelection2 = (v) => {
      selectedValue2.value = v;
      sortBody();
    };

    const sortBody = () => {
      const sort = selectedValue2.value;
      console.log(sort);
      if (sort === 'asc') {
        body.value = body.value.sort((a, b) => {
          let textA = a[1].text;
          let textB = b[1].text;
          return textA - textB;
        });
      } else {
        body.value = body.value.sort((a, b) => {
          let textA = a[1].text;
          let textB = b[1].text;
          return textB - textA;
        });
      }
    };

    const fetchReportList = async () => {
      const reportReponse = await IDService.getReports({
        pageNo: pageNo.value,
        recordCount: recordCount.value,
      });
      const resData = reportReponse.data;
      originList.value = resData.pollList;

      pageNo.value = resData.pageNo;
      totalCount.value = resData.totalCount;

      let result = [];
      resData.pollList.map((item, idx) => {
        let arr = [
          { isCheckbox: true },
          { isNum: true, text: idx + 1 },
          { text: item.pollNm },
          { text: '관리>설정을 해주세요.' },
          {
            text:
              item.pollBgnde !== '' && item.pollEndde !== ''
                ? _mixDate(item.pollBgnde, item.pollEndde)
                : '관리>설정을 해주세요.',
          },
        ];

        if (item.pollTarget.length) {
          arr.push({ isButton: '상세보기' });
        } else {
          arr.push({ text: '-' });
        }
        arr.push({ isOpenPopup: idx + '' });

        if (item.pollTarget.length) {
          let ary = item.pollTarget;
          const tmpOptions1 = [];
          const tmpAry = ary.map((v) => {
            const tmp = v.split('__');
            let result = '';
            let result2 = '';
            if (tmp[0] === 'null') result += tmp[1][0];
            else result += tmp[0];
            result += tmp[2][0];

            result2 += tmp[1][0];
            result2 += tmp[2][0];
            tmpOptions1.push(result2);
            return result;
          });
          filterOption1[idx] = tmpOptions1;
          options1.value = [...options1.value, ...tmpOptions1];
          arr[3].text = tmpAry.join(', ');
        }

        result.push(arr);
      });

      body.value = result;
      console.log('body');
      console.log(body.value);

      sortGrade();
      startOption1.value = '전체';
    };

    const sortGrade = () => {
      const grade = options1.value;
      let uniqueGrades = Array.from(new Set(grade));
      uniqueGrades.sort((a, b) => {
        // "전체" 항목을 가장 앞에 오도록 처리
        if (a === '전체') return -1;
        if (b === '전체') return 1;

        // 접두사와 숫자를 분리
        let prefixA = a.slice(0, 1);
        let prefixB = b.slice(0, 1);
        let numberA = parseInt(a.slice(1));
        let numberB = parseInt(b.slice(1));

        // 접두사를 기준으로 정렬
        if (rank[prefixA] !== rank[prefixB]) {
          return rank[prefixA] - rank[prefixB];
        } else {
          // 접두사가 같으면 숫자를 기준으로 정렬
          return numberA - numberB;
        }
      });
      options1.value = uniqueGrades;
    };

    const goReportDtl = () => {
      router.push({ name: 'IDManageReportDtlView' });
    };

    return {
      originList,
      popupReport,
      options1,
      options2,
      startOption1,
      startOption2,
      header,
      body,
      pageNo,
      recordCount,
      totalCount,

      handleSelection1,
      handleSelection2,
      fetchReportList,
      goReportDtl,
    };
  },
};
</script>

<style scoped></style>
