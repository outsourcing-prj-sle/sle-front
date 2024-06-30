<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div
      class="flex gap-1 items-start self-stretch max-md:flex-wrap max-md:max-w-full"
    >
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">
          {{ $t(`report${nttNo}.title`) }}
        </h1>
        <h2 class="mt-1 text-2xl text-neutral-700 text-left">
          {{ $t('header.my_sel') }}
        </h2>
      </div>
      <article
        class="flex flex-col grow shrink-0 self-end mt-9 font-medium text-black basis-0 w-fit max-md:max-w-full"
      >
        <div class="self-end text-base leading-8 max-lg:text-sm max-md:text-xs">
          {{ $t('report.period') }} : {{ dateRange }}
        </div>
      </article>
    </div>

    <div
      class="flex gap-2.5 self-start mt-1.5 max-md:flex-wrap"
      v-if="isVoice"
      @click="useTTS"
    >
      <img
        src="@/assets/img/speaker.png"
        alt="speaker"
        class="shrink-0 aspect-square w-[25px] max-lg:w-[20px]"
      />
      <p
        class="flex-auto my-auto max-md:max-w-full max-lg:text-sm max-md:text-xs"
      >
        {{ $t('report.announce_voice') }}
      </p>
    </div>
  </section>
  <ReportQuestion1
    :status="status"
    :_page="page"
    :_currentStep="currentStep"
    :_currentAnswer="currentAnswer"
    @handleAnswer="handleAnswer"
    v-if="type === 'QES00000000000000001'"
  />
  <ReportQuestion2
    :status="status"
    :_page="page"
    :_currentStep="currentStep"
    :_currentAnswer="currentAnswer"
    @handleAnswer="handleAnswer"
    v-if="type === 'QES00000000000000002'"
  />
  <ReportQuestion3
    :status="status"
    :_page="page"
    :_currentStep="currentStep"
    :_currentAnswer="currentAnswer"
    @handleAnswer="handleAnswer"
    v-if="type === 'QES00000000000000003'"
  />
  <ReportQuestion4
    :status="status"
    :_page="page"
    :_currentStep="currentStep"
    :_currentAnswer="currentAnswer"
    @handleAnswer="handleAnswer"
    v-if="type === 'QES00000000000000004'"
  />
  <ReportQuestion5
    :status="status"
    :_page="page"
    :_currentStep="currentStep"
    :_currentAnswer="currentAnswer"
    @handleAnswer="handleAnswer"
    v-if="type === 'QES00000000000000005'"
  />
  <ReportQuestion6
    :status="status"
    :_page="page"
    :_currentStep="currentStep"
    :_currentAnswer="currentAnswer"
    :_currentAnswer2="currentAnswer2"
    @handleAnswer="handleAnswer"
    v-if="type === 'QES00000000000000006'"
  />

  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
    v-if="isAllowed"
  >
    <div class="flex gap-4">
      <button
        class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-neutral-500 rounded-3xl max-md:px-5"
        v-if="page !== 1"
        @click="prevStep"
      >
        {{ $t('report.previous') }}
      </button>
      <button
        class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
        @click="nextStep"
      >
        {{ step.length === page ? $t('report.complete') : $t('report.next') }}
      </button>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ReportQuestion1 from '@/components/ReportQuestion1.vue';
import ReportQuestion2 from '@/components/ReportQuestion2.vue';
import ReportQuestion3 from '@/components/ReportQuestion3.vue';
import ReportQuestion4 from '@/components/ReportQuestion4.vue';
import ReportQuestion5 from '@/components/ReportQuestion5.vue';
import ReportQuestion6 from '@/components/ReportQuestion6.vue';
import ReportService from '@/service/ReportService.js';
import { _mixDate } from '@/utils/utils.js';

export default {
  name: 'LoginView',
  components: {
    ReportQuestion1,
    ReportQuestion2,
    ReportQuestion3,
    ReportQuestion4,
    ReportQuestion5,
    ReportQuestion6,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const type = ref(route.params.type || 1);
    const status = ref('progress');
    const metadata = ref([]);
    const isSave = ref(true);
    const isVoice = ref(false);
    const step = ref([]);
    const stepAnswer = ref([]);
    const stepAnswer2 = ref([]);
    const title = ref('');
    const dateRange = ref('');
    const canTTS = ref(true);
    const nttNo = ref(1);
    const page = ref(1);
    const pageToIndex = computed(() => {
      return page.value - 1;
    });
    const currentStep = computed(() => {
      return step.value[pageToIndex.value]?.toString();
    });
    const currentAnswer = computed(() => {
      return stepAnswer.value[pageToIndex.value]?.toString() || null;
    });
    const currentAnswer2 = computed(() => {
      return stepAnswer2.value[pageToIndex.value]?.toString() || null;
    });
    const isAllowed = computed(() => {
      const ary = ['6'];
      const need2 = ary.includes(nttNo.value);
      let need2Flag = true;
      if (need2) {
        need2Flag = !!currentAnswer2.value;
      }

      return !!currentAnswer.value && need2Flag;
    });

    onMounted(async () => {
      await fetchData();
    });

    const fetchData = async () => {
      try {
        const reportRespose = await ReportService.reportStart({
          pollId: type.value,
        });
        const resData = reportRespose.data;
        console.log(resData);

        if (resData.error) {
          alert(resData.error);
          return;
        }

        nttNo.value = resData.nttNo || nttNo.value;
        isSave.value = resData.isSave;
        isVoice.value = resData.isVoice;
        status.value = resData.status;
        metadata.value = resData.metadata;
        title.value = resData.pollNm;
        dateRange.value = _mixDate(resData.startDate, resData.endDate);
        resData.step = resData.step.split(',');
        step.value = [];

        for (let i in resData.step) {
          i = parseInt(i);
          // step 답변 데이터 예시 : 문제:답1/답2 -> 1:4/0
          const sData = resData.step[i];
          const ssData = sData.split(':');
          const sssData = ssData[1].split('/');

          step.value.push(ssData[0]);
          if (status.value === 'done' || isSave.value) {
            stepAnswer.value.push(parseInt(sssData[0]) || null);
            stepAnswer2.value.push(parseInt(sssData[1]) || null);
          }
        }
      } catch (e) {
        console.log('yhs :: e');
        console.log(e);
      }
    };

    const useTTS = () => {
      if (!isVoice.value) return;
      if (!canTTS.value) return;
      canTTS.value = false;

      const text = t(`report${nttNo.value}.q${currentStep.value}_tts`);
      const utterancequestionDefault = new SpeechSynthesisUtterance(text);

      window.speechSynthesis.speak(utterancequestionDefault);
    };

    const nextStep = () => {
      const v1 = currentAnswer.value;
      const v2 = currentAnswer2.value;
      if (!v1) return;
      if (!v2 && nttNo.value === '6') return;

      // 마지막일때 완료 페이지로
      if (step.value.length === page.value) {
        if (status.value !== 'done') {
          ReportService.reportComplete({
            pollId: type.value,
            qesitmSn: pageToIndex.value,
            qesitmAnswer: v1,
            ...(v2 && { qesitmAnswerImage: v2 }),
          });
          router.push({
            name: 'reportFin',
            query: {
              title: title.value,
              date: dateRange.value,
            },
          });
        } else {
          router.push({ name: 'mySEL' });
        }
        return;
      }

      // 완료 상태가 아니면 값 저장
      if (status.value !== 'done') {
        ReportService.reportSave({
          pollId: type.value,
          qesitmSn: pageToIndex.value,
          qesitmAnswer: v1,
          ...(v2 && { qesitmAnswerImage: v2 }),
        });

        stepAnswer.value[pageToIndex.value] = v1;
        stepAnswer2.value[pageToIndex.value] = v2;
      }

      page.value += 1;
      canTTS.value = true;
    };

    const prevStep = () => {
      // 처음일때 무반응
      if (page.value === 1) {
        return;
      }

      page.value -= 1;
    };

    const handleAnswer = (v1 = null, v2 = null) => {
      if (v1) {
        stepAnswer.value[pageToIndex.value] = v1;
      }
      if (v2) {
        stepAnswer2.value[pageToIndex.value] = v2;
      }
    };

    return {
      type,
      status,
      metadata,
      isSave,
      isVoice,
      step,
      stepAnswer,
      stepAnswer2,
      title,
      dateRange,
      nttNo,
      page,
      isAllowed,
      pageToIndex,
      currentStep,
      currentAnswer,
      currentAnswer2,

      useTTS,
      prevStep,
      nextStep,
      handleAnswer,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
