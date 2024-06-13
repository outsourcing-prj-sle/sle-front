<template>
  <div class="flex flex-col bg-white">
    <section
      class="flex gap-5 justify-between px-16 py-6 w-full bg-blue-200 text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
    >
      <div class="flex flex-col my-auto">
        <h2 class="text-xl font-bold text-left">나의 SEL 알기</h2>
        <p class="mt-4 text-base font-medium text-left">
          활동 참여를 통해 나의 SEL을 자세히 알아볼 수 있습니다.<br />기간 내
          맞춰서 참여할 수 있도록 해주세요.
        </p>
      </div>
      <img
        src="@/assets/img/logo_sel.png"
        alt="Logo"
        class="h-[150px] aspect-[2.5]"
      />
    </section>
    <section
      class="flex flex-col px-20 mt-7 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <div class="w-40 flex justify-start">
        <AppDropdown
          :options="options"
          :startText="selectedOption"
          :openWay="'left'"
          @update:selectedOption="handleSelection"
        />
      </div>

      <div class="mt-4 w-full overflow-x-scroll" v-if="infoArr.length">
        <div class="w-full">
          <table
            class="table-auto border-collapse w-full"
            style="white-space: nowrap"
          >
            <thead>
              <tr class="mt-5 font-semibold text-cyan-900">
                <th class="p-2 bg-blue-100 max-md:px-5">번호</th>
                <th class="p-2 bg-blue-100 max-md:px-5">활동명</th>
                <th class="p-2 bg-blue-100 max-md:px-5">시행기간</th>
                <th class="p-2 bg-blue-100 max-md:px-5">상태</th>
                <th class="p-2 bg-blue-100 max-md:px-5">기능</th>
              </tr>
            </thead>
            <tbody class="">
              <tr
                class="w-full border-b border-solid border-stone-200"
                v-for="(info, i) in infoArr"
                :key="i"
              >
                <td class="my-auto text-neutral-700 px-2 py-2.5 w-[50px]">
                  {{ i + 1 }}
                </td>
                <td class="my-auto text-zinc-800 px-2">{{ info.title }}</td>
                <td class="my-auto text-zinc-800 px-2 w-[260px] text-center">
                  {{ info.date }}
                </td>
                <td class="my-auto text-zinc-800 px-2 w-[200px] text-center">
                  <div v-if="info.state === 'fin'">완료</div>
                  <div v-if="info.state === 'closed'">미참여-마감</div>
                  <div v-if="info.state === 'start'">
                    <button
                      class="justify-center self-stretch px-4 py-1 font-medium text-white whitespace-nowrap bg-blue-400 rounded-[999px]"
                      @click="() => goReportNoticePage(1)"
                    >
                      시작하기
                    </button>
                  </div>
                  <div v-if="info.state === 'restart'">
                    <button
                      class="justify-center self-stretch px-4 py-1 font-medium text-white bg-blue-600 rounded-[999px]"
                      @click="() => goReportQuestionPage(1)"
                    >
                      이어서 진행하기
                    </button>
                  </div>
                </td>
                <td class="my-auto text-zinc-800 px-2 w-[130px] text-center">
                  <div v-if="info.state === 'fin'">
                    <button
                      class="justify-center self-stretch px-4 py-1 font-medium text-white bg-slate-400 rounded-[999px]"
                      @click="() => goReportQuestionPage(1)"
                    >
                      내 답안 보기
                    </button>
                  </div>
                  <div v-else>-</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="mt-4 w-full overflow-x-scroll border border-current pb-4"
        v-else
      >
        설문이 없습니다.
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import AppDropdown from '../components/AppDropdown.vue';

export default {
  components: {
    AppDropdown,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const userId = computed(() => userStore.id);
    const infoArr = ref([]);

    const options = ref(['마감순', '마감순 2', '마감순 3']);
    const selectedOption = ref('마감순');

    onMounted(() => {
      fetchData();
    });

    const fetchData = () => {
      // todo : api 호출하여 데이터 가져오기
      // userId.value이용

      infoArr.value = [
        {
          title: '마음열기 설문1',
          date: '2023-09-01 ~ 2023-10-31',
          state: 'closed',
        },
        {
          title: '마음열기 설문2',
          date: '2023-09-01 ~ 2023-10-31',
          state: 'fin',
        },
        {
          title: '마음열기 설문2',
          date: '2023-09-01 ~ 2023-10-31',
          state: 'start',
        },
        {
          title: '마음열기 설문2',
          date: '2023-09-01 ~ 2023-10-31',
          state: 'restart',
        },
        {
          title: '마음열기 설문2',
          date: '2023-09-01 ~ 2023-10-31',
          state: 'fin',
        },
      ];
    };

    const handleSelection = (option) => {
      selectedOption.value = option;
    };

    const goReportNoticePage = (type = 1) => {
      router.push({
        name: 'reportNotice',
        params: { type: type },
      });
    };

    const goReportQuestionPage = (type = 1) => {
      router.push({
        name: 'reportQuestion',
        params: { type: type },
      });
    };

    return {
      options,
      selectedOption,
      infoArr,
      handleSelection,
      goReportNoticePage,
      goReportQuestionPage,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
