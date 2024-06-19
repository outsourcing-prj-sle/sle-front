<template>
  <ReportQuestion1
    :startStep="startStep"
    :status="status"
    :metadata="metadata"
    :isSave="isSave"
    :isVoice="isVoice"
    :step="step"
    :stepAnswer="stepAnswer"
    :title="title"
    :dateRange="dateRange"
    :isPrev="true"
    v-if="type === 'QES00000000000000001'"
  />
  <ReportQuestion2
    :startStep="startStep"
    :status="status"
    :metadata="metadata"
    :isSave="isSave"
    :isVoice="isVoice"
    :step="step"
    :stepAnswer="stepAnswer"
    :title="title"
    :dateRange="dateRange"
    :isPrev="true"
    v-if="type === 'QES00000000000000002'"
  />
  <ReportQuestion3
    :startStep="startStep"
    :status="status"
    :metadata="metadata"
    :isSave="isSave"
    :isVoice="isVoice"
    :step="step"
    :stepAnswer="stepAnswer"
    :title="title"
    :dateRange="dateRange"
    :isPrev="false"
    v-if="type === 'QES00000000000000003'"
  />
  <ReportQuestion4
    :startStep="startStep"
    :status="status"
    :metadata="metadata"
    :isSave="isSave"
    :isVoice="isVoice"
    :step="step"
    :stepAnswer="stepAnswer"
    :title="title"
    :dateRange="dateRange"
    :isPrev="false"
    v-if="type === 'QES00000000000000004'"
  />
  <ReportQuestion5
    :startStep="startStep"
    :status="status"
    :metadata="metadata"
    :isSave="isSave"
    :isVoice="isVoice"
    :step="step"
    :stepAnswer="stepAnswer"
    :title="title"
    :dateRange="dateRange"
    :isPrev="false"
    v-if="type === 'QES00000000000000005'"
  />
  <ReportQuestion6
    :startStep="startStep"
    :status="status"
    :metadata="metadata"
    :isSave="isSave"
    :isVoice="isVoice"
    :step="step"
    :stepAnswer="stepAnswer"
    :stepAnswer2="stepAnswer2"
    :title="title"
    :dateRange="dateRange"
    :isPrev="false"
    v-if="type === 'QES00000000000000006'"
  />
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();
    const type = ref(route.params.type || 1);
    const startStep = ref(0);
    const status = ref('progress');
    const metadata = ref([]);
    const isSave = ref(true);
    const isVoice = ref(true);
    const step = ref([]);
    const stepAnswer = ref([]);
    const stepAnswer2 = ref([]);
    const title = ref('');
    const dateRange = ref('');

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
          // 답변 데이터 예시 : 문제:답1/답2 -> 1:4/0
          const sData = resData.step[i];
          const ssData = sData.split(':');
          const sssData = ssData[1].split('/');

          // todo : 이어서하기 하면 시작하는 시점 다르게 하려고했는데 에러남 걍 나중에 ㄱㄱ
          // if (
          //   ssData[1] &&
          //   !startStep.value &&
          //   startStep.value !== 0 &&
          //   status.value !== 'done'
          // ) {
          //   startStep.value = i;
          // }
          step.value.push(ssData[0]);
          stepAnswer.value.push(parseInt(sssData[0]) || null);
          stepAnswer2.value.push(parseInt(sssData[1]) || null);
        }
      } catch (e) {
        console.log('yhs :: e');
        console.log(e);
      }
    };

    return {
      type,
      startStep,
      status,
      metadata,
      isSave,
      isVoice,
      step,
      stepAnswer,
      stepAnswer2,
      title,
      dateRange,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
