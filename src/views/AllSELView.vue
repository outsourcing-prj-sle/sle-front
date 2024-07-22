<template>
  <div class="flex flex-col bg-white">
    <div
      class="flex justify-start flex-col px-20 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <h1 class="text-xl text-left font-bold text-neutral-700">
        {{ $t('sel.title_sel_teacher') }}
      </h1>
      <h2 class="mt-2 text-left text-lg font-semibold text-neutral-700">
        {{ $t('sel.subtitle_sel_teacher') }}
      </h2>
    </div>
    <section
      class="flex flex-col px-20 mt-5 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <div class="w-full flex justify-start z-50">
        <AppDropdown
          class="w-full"
          :options="reportList"
          :startText="selectedReport"
          :updateText="updateText"
          :openWay="'left'"
          :openFull="true"
          @update:selectedOption="handleReportSelection"
        />
      </div>
      <div
        class="mt-2.5 text-base text-left font-semibold max-md:max-w-full"
        v-if="reportMetadata[selectedReport]"
      >
        <span class="font-medium"
          >{{ $t('sel.activity_term') }} :
          {{ reportMetadata[selectedReport].dateRange }} (</span
        >
        <span
          class="font-medium text-blue-500"
          :class="{
            'text-red-600': !reportMetadata[selectedReport].state,
          }"
        >
          {{
            reportMetadata[selectedReport].state
              ? $t('sel.done')
              : $t('sel.non_done')
          }}
        </span>
        <span class="font-medium">)</span>
      </div>
      <div class="w-full flex justify-between items-center mt-2">
        <div class="flex gap-4">
          <AppDropdown
            :openWay="'left'"
            :openFull="true"
            :options="options"
            :startText="selectedOption"
            @update:selectedOption="handleSelection"
            v-if="selectedReport !== all"
          />
          <label
            class="flex gap-2.5 my-auto text-base font text-neutral-700"
            v-if="selectedReport !== all"
          >
            <input
              type="checkbox"
              class="shrink-0 w-6 h-6 bg-white border border-solid border-neutral-400"
              v-model="showOnlyNon"
            />
            <span class="flex-auto my-auto">{{ $t('sel.only_non_ing') }}</span>
          </label>
        </div>
        <div class="text-blue-500 cursor-pointer" @click="downloadExcel">
          <img
            class="h-[38px]"
            src="@/assets/img/btn_excel_download.png"
            alt="엑셀_다운로드"
          />
        </div>
      </div>
      <div v-if="infoArr.length">
        <div class="mt-4 w-full overflow-x-scroll">
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
                  <th
                    class="p-2 bg-blue-100 max-md:px-5"
                    v-for="(title, i) in titleArr"
                    :key="`${title}${i}`"
                  >
                    {{ title }}
                  </th>
                </tr>
              </thead>
              <tbody class="" v-if="selectedReport !== all">
                <template
                  v-for="(info, i) in infoArr"
                  :key="`${info.name}${i}`"
                >
                  <tr
                    class="w-full border-b border-solid border-stone-200"
                    v-if="
                      (!showOnlyNon ||
                        (showOnlyNon && !info.stateList[currentNum])) &&
                      i < idx
                    "
                  >
                    <td class="my-auto text-neutral-700 px-2 py-2.5 w-[50px]">
                      {{ i + 1 }}
                    </td>
                    <td class="my-auto text-zinc-800 px-2">{{ info.name }}</td>
                    <td class="my-auto text-zinc-800 px-2">{{ info.email }}</td>
                    <td class="my-auto text-zinc-800 px-2">{{ info.grade }}</td>
                    <td class="my-auto text-zinc-800 px-2">
                      {{ info.gender }}
                    </td>
                    <td
                      class="my-auto px-2"
                      :class="{
                        'text-red-600':
                          info.stateList && !info.stateList[currentNum],
                        'text-zinc-800': info.stateList[currentNum],
                      }"
                    >
                      {{
                        info.stateList[currentNum]
                          ? $t('sel.done')
                          : $t('sel.non_done')
                      }}
                    </td>
                  </tr>
                </template>
              </tbody>
              <tbody class="" v-else>
                <template
                  v-for="(info, i) in infoArr"
                  :key="`${info.name}${i}`"
                >
                  <tr
                    v-if="i < idx"
                    class="w-full border-b border-solid border-stone-200"
                  >
                    <td class="my-auto text-neutral-700 px-2 py-2.5 w-[50px]">
                      {{ i + 1 }}
                    </td>
                    <td class="my-auto text-zinc-800 px-2">{{ info.name }}</td>
                    <td class="my-auto text-zinc-800 px-2">{{ info.email }}</td>
                    <td class="my-auto text-zinc-800 px-2">{{ info.grade }}</td>
                    <td class="my-auto text-zinc-800 px-2">
                      {{ info.gender }}
                    </td>
                    <td
                      class="my-auto px-2"
                      v-for="title in titleReportArr"
                      :key="`${title}${info.name}${i}`"
                      :class="{
                        'text-red-600': !info.stateList[parseTitleToNum(title)],
                        'text-zinc-800': info.stateList[parseTitleToNum(title)],
                      }"
                    >
                      {{
                        info.stateList[parseTitleToNum(title)]
                          ? $t('sel.done')
                          : $t('sel.non_done')
                      }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-center m-2">
          <button
            v-if="idx < max"
            class="m-2 p-2 w-full bg-blue-500 text-white rounded-lg"
            @click="infiniteScroll"
          >
            {{ $t('sel.more') }}
          </button>
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
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import AppDropdown from '@/components/AppDropdown.vue';
import UserService from '@/service/UserService';
import { _mixDate } from '@/utils/utils';

export default {
  components: {
    AppDropdown,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const userStore = useUserStore();
    const _infoArr = ref([]);
    const titleArr = ref([]);
    const titleReportArr = ref([]);
    const showOnlyNon = ref(false);
    const idx = ref(10);
    const max = ref(0);

    const all = computed(() => {
      return t('sel.all');
    });
    const reportList = ref([all.value]);
    const selectedReport = ref(all.value);
    const updateText = ref(all.value);
    const reportMetadata = ref({});

    const options = ref([t('common.sort_dead'), t('common.sort_new')]);
    const selectedOption = ref(t('common.sort_dead'));

    watch(
      () => [all.value],
      () => {
        fetchReportList();
      }
    );

    onMounted(() => {
      fetchReportList();
    });

    const handleSelection = (option) => {
      selectedOption.value = option;
      console.log(_infoArr.value);
    };

    const fetchReportList = async () => {
      const mySelReponse = await UserService.getMySEL({});
      const resData = mySelReponse.data;
      console.log(resData);

      reportList.value = [all.value];
      titleReportArr.value.length = 0;

      if (selectedReport.value === '전체' || selectedReport.value === 'All') {
        updateText.value = all.value;
      } else {
        const n = selectedReport.value.slice(-1);
        updateText.value = t(`report${n}.title`);
      }

      resData.reportList.map((item) => {
        const num = item.pollNm.slice(-1);
        const pollNm = t(`report${num}.title`);
        reportList.value.push(pollNm);
        titleReportArr.value.push(pollNm);

        reportMetadata.value[pollNm] = {
          dateRange: _mixDate(item.startDate, item.endDate) + t('sel.until'),
          state: item.expired === '0',
        };
      });

      _infoArr.value.length = 0;
      resData.infoArr.map((item) => {
        const info = {
          name: item.name,
          email: item.email,
          grade: item.classInfo,
          gender: item.sex === 'M' ? t('sel.M') : t('sel.F'),
          stateList: item.stateList,
        };

        _infoArr.value.push(info);
      });

      max.value = _infoArr.value.length;

      setTitleList();
    };

    const parseTitleToNum = (title) => {
      const num = title.slice(-1);
      return num;
    };

    const currentNum = computed(() => {
      const num = selectedReport.value.slice(-1);
      return num;
    });

    const infoArr = computed(() => {
      return _infoArr.value;
    });

    const setTitleList = () => {
      titleArr.value = [
        t('sel.name'),
        t('sel.email'),
        t('sel.grade') + '-' + t('sel.class'),
        t('sel.gender'),
      ];
      if (selectedReport.value === all.value) {
        // todo : 이거 API 받는거대로 수정
        titleArr.value.push(...titleReportArr.value);
      } else {
        titleArr.value.push(t('sel.state'));
      }
    };

    const handleReportSelection = (option) => {
      selectedReport.value = option;
      setTitleList();
      idx.value = 10;
    };

    const downloadExcel = () => {
      if (infoArr.value.length) {
        const aEl = document.createElement('a');

        let text = '\uFEFF';
        text += titleArr.value.join(',') + '\n';

        infoArr.value.forEach((info) => {
          text += [info.name, info.email, info.grade, info.gender].join(',');
          if (selectedReport.value === all.value) {
            for (let i in titleReportArr.value) {
              text += info.stateList[i + 1 + '']
                ? ',' + t('sel.done')
                : ',' + t('sel.non_done');
            }
          } else {
            text += info.stateList[currentNum.value]
              ? ',' + t('sel.done')
              : ',' + t('sel.non_done');
          }
          text += '\n';
        });

        aEl.setAttribute(
          'href',
          `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
        );

        aEl.setAttribute('download', `${new Date()}_SEL.csv`);

        aEl.style.display = 'none';
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
      } else {
        alert(t('sel.no_data'));
      }
    };

    const infiniteScroll = () => {
      if (idx.value > max.value) {
        return;
      }

      idx.value += 10;
    };

    return {
      reportList,
      selectedReport,
      reportMetadata,
      infoArr,
      titleArr,
      titleReportArr,
      handleReportSelection,
      showOnlyNon,
      idx,
      max,
      all,
      updateText,
      currentNum,

      options,
      selectedOption,
      parseTitleToNum,
      handleSelection,
      downloadExcel,
      infiniteScroll,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
