<template>
  <ReportNotice1 v-if="type === '1' || type === 1" />
  <ReportNotice2 v-if="type === '2' || type === 2" />
  <ReportNotice3 v-if="type === '3' || type === 3" />
  <ReportNotice4 v-if="type === '4' || type === 4" />
  <ReportNotice5 v-if="type === '5' || type === 5" />
  <ReportNotice6 v-if="type === '6' || type === 6" />
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ReportNotice1 from '@/components/ReportNotice1.vue';
import ReportNotice2 from '@/components/ReportNotice2.vue';
import ReportNotice3 from '@/components/ReportNotice3.vue';
import ReportNotice4 from '@/components/ReportNotice4.vue';
import ReportNotice5 from '@/components/ReportNotice5.vue';
import ReportNotice6 from '@/components/ReportNotice6.vue';

export default {
  name: 'LoginView',
  components: {
    ReportNotice1,
    ReportNotice2,
    ReportNotice3,
    ReportNotice4,
    ReportNotice5,
    ReportNotice6,
  },
  setup() {
    const route = useRoute();
    const type = ref(route.params.type || 1);
    console.log(type);

    return {
      type,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
