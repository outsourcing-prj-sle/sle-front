<template>
  <div class="flex flex-col bg-white">
    <section
      class="flex gap-5 justify-between px-16 py-6 w-full bg-blue-200 text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
    >
      <div class="flex flex-col my-auto">
        <h2 class="text-xl font-bold text-left">
          {{ $t('sel.title_sel_student') }}
        </h2>
        <p
          class="mt-4 text-base font-medium text-left"
          v-html="$t('sel.subtitle_sel_student')"
        ></p>
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
                <th class="p-2 bg-blue-100 max-md:px-5">
                  {{ $t('sel.number') }}
                </th>
                <th class="p-2 bg-blue-100 max-md:px-5">
                  {{ $t('sel.report_name') }}
                </th>
                <th class="p-2 bg-blue-100 max-md:px-5">
                  {{ $t('sel.report_term') }}
                </th>
                <th class="p-2 bg-blue-100 max-md:px-5">
                  {{ $t('sel.state') }}
                </th>
                <th class="p-2 bg-blue-100 max-md:px-5">
                  {{ $t('sel.func') }}
                </th>
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
                <td class="my-auto text-zinc-800 px-2">
                  {{ $t(`report${info.nttNo}.title`) }}
                </td>
                <td class="my-auto text-zinc-800 px-2 w-[260px] text-center">
                  {{ mixDate(info.startDate, info.endDate) }}
                </td>
                <td class="my-auto text-zinc-800 px-2 w-[200px] text-center">
                  <div v-if="info.status === 'done'">{{ $t('sel.fin') }}</div>
                  <div v-else-if="info.status === 'todo' && !info.expired">
                    {{ $t('sel.non_fin') }}
                  </div>
                  <div v-else-if="info.status === 'todo'">
                    <button
                      class="justify-center self-stretch px-4 py-1 font-medium text-white whitespace-nowrap bg-blue-400 rounded-[999px]"
                      @click="() => goReportNoticePage(info.pollId)"
                    >
                      {{ $t('sel.todo') }}
                    </button>
                  </div>
                  <div v-else>
                    <button
                      class="justify-center self-stretch px-4 py-1 font-medium text-white bg-blue-600 rounded-[999px]"
                      @click="() => goReportQuestionPage(info.pollId)"
                    >
                      {{ $t('sel.progress') }}
                    </button>
                  </div>
                </td>
                <td class="my-auto text-zinc-800 px-2 w-[130px] text-center">
                  <div v-if="info.status === 'done'">
                    <button
                      class="justify-center self-stretch px-4 py-1 font-medium text-white bg-slate-400 rounded-[999px]"
                      @click="() => goReportQuestionPage(info.pollId)"
                    >
                      {{ $t('sel.see_my_report') }}
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
        {{ $t('sel.no_reports') }}
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import UserService from '@/service/UserService.js';
import AppDropdown from '@/components/AppDropdown.vue';
import { _mixDate } from '@/utils/utils.js';

export default {
  components: {
    AppDropdown,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const infoArr = ref([]);

    const options = ref([t('common.sort_dead'), t('common.sort_new')]);
    const selectedOption = ref(t('common.sort_dead'));

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      const mySELResponse = await UserService.getMySEL();
      const resData = mySELResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      infoArr.value = sortArrEnd(resData);
    };

    const extractNumber = (name) => {
      const match = name.match(/(\d+)$/); // 이름 끝에서 숫자 추출
      return match ? parseInt(match[1], 10) : Infinity; // 숫자가 없으면 무한대 반환
    };

    const sortArrEnd = (arr) => {
      return arr.sort((a, b) => {
        const dateA = new Date(
          a.endDate.slice(0, 4),
          a.endDate.slice(4, 6) - 1,
          a.endDate.slice(6, 8)
        );
        const dateB = new Date(
          b.endDate.slice(0, 4),
          b.endDate.slice(4, 6) - 1,
          b.endDate.slice(6, 8)
        );
        if (dateA - dateB !== 0) {
          return dateA - dateB;
        } else {
          // endDate가 같은 경우 name에서 숫자를 비교
          const numA = extractNumber(a.pollNm);
          const numB = extractNumber(b.pollNm);
          return numA - numB;
        }
      });
    };
    const sortArrStart = (arr) => {
      return arr.sort((a, b) => {
        const dateA = new Date(
          a.startDate.slice(0, 4),
          a.startDate.slice(4, 6) - 1,
          a.startDate.slice(6, 8)
        );
        const dateB = new Date(
          b.startDate.slice(0, 4),
          b.startDate.slice(4, 6) - 1,
          b.startDate.slice(6, 8)
        );
        if (dateA - dateB !== 0) {
          return dateB - dateA;
        } else {
          // endDate가 같은 경우 name에서 숫자를 비교
          const numA = extractNumber(a.pollNm);
          const numB = extractNumber(b.pollNm);
          return numA - numB;
        }
      });
    };

    const handleSelection = (option) => {
      selectedOption.value = option;
      if (option === 'common.sort_new') {
        sortArrStart(infoArr.value);
      }
      if (option === t('common.sort_dead')) {
        sortArrEnd(infoArr.value);
      }
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

    const mixDate = (s, e) => {
      return _mixDate(s, e);
    };

    return {
      options,
      selectedOption,
      infoArr,
      handleSelection,
      goReportNoticePage,
      goReportQuestionPage,
      mixDate,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
