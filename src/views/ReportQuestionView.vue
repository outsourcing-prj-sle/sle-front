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
    v-if="(type === '1' || type === 1) && step?.length"
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
    v-if="(type === '2' || type === 2) && step?.length"
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
    v-if="(type === '3' || type === 3) && step?.length"
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
    v-if="(type === '4' || type === 4) && step?.length"
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
    v-if="(type === '5' || type === 5) && step?.length"
  />
  <ReportQuestion6
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
    v-if="(type === '6' || type === 6) && step?.length"
  />
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import ReportQuestion1 from '@/components/ReportQuestion1.vue';
import ReportQuestion2 from '@/components/ReportQuestion2.vue';
import ReportQuestion3 from '@/components/ReportQuestion3.vue';
import ReportQuestion4 from '@/components/ReportQuestion4.vue';
import ReportQuestion5 from '@/components/ReportQuestion5.vue';
import ReportQuestion6 from '@/components/ReportQuestion6.vue';

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
    const userStore = useUserStore();
    const userId = computed(() => userStore.id);
    const type = ref(route.params.type || 1);
    const startStep = ref(null);
    const status = ref('progress');
    const metadata = ref({});
    const isSave = ref(true);
    const isVoice = ref(true);
    const step = ref([]);
    const stepAnswer = ref([]);
    const title = ref('');
    const dateRange = ref('');

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      // todo : api 호출 (시작하기, 혹은 이어하기, 혹은 내 답안 보기 - 이전 다음만 확인 가능, 답안 변경 불가, 완료 불가)
      const data = {
        title: '마음알기 설문1',
        dateRange: '2023.09.01~01.03',
        status: 'progress', //progress, done,
        step: '1, 3, 5, 2, 4, 6', //'1:1, 3:0, 5:2, 2, 4, 6'
        metadata: {
          1: {
            Q: '문제 입니다.1',
            A: [1, 2, 3, 4, 5],
          },
          2: {
            Q: '문제 입니다.2',
            A: [1, 2, 3, 4, 5],
          },
          3: {
            Q: '문제 입니다.3',
            A: [1, 2, 3, 4, 5],
          },
          4: {
            Q: '문제 입니다.4',
            A: [1, 2, 3, 4, 5],
          },
          5: {
            Q: '문제 입니다.5',
            A: [1, 2, 3, 4, 5],
          },
          6: {
            Q: '문제 입니다.6',
            A: [1, 2, 3, 4, 5],
          },
        },
        isSave: true,
        isVoice: true,
      };

      isSave.value = data.isSave;
      isVoice.value = data.isVoice;
      status.value = data.status;
      metadata.value = data.metadata;
      title.value = data.title;
      dateRange.value = data.dateRange;
      data.step = data.step.split(', ');

      for (let i in data.step) {
        i = parseInt(i);

        const sData = data.step[i];
        const ssData = sData.split(':');
        if (!ssData[1] && startStep.value !== 0) {
          startStep.value = i;
        }
        step.value.push(ssData[0]);
        stepAnswer.value.push(ssData[1] || null);
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
      title,
      dateRange,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
