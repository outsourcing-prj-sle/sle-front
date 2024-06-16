<template>
  <ReportNotice1
    v-if="type === '1' || type === 1"
    :title="title"
    :expired="expired"
    :date="date"
  />
  <ReportNotice2
    v-if="type === '2' || type === 2"
    :title="title"
    :expired="expired"
    :date="date"
  />
  <ReportNotice3
    v-if="type === '3' || type === 3"
    :title="title"
    :expired="expired"
    :date="date"
  />
  <ReportNotice4
    v-if="type === '4' || type === 4"
    :title="title"
    :expired="expired"
    :date="date"
  />
  <ReportNotice5
    v-if="type === '5' || type === 5"
    :title="title"
    :expired="expired"
    :date="date"
  />
  <ReportNotice6
    v-if="type === '6' || type === 6"
    :title="title"
    :expired="expired"
    :date="date"
  />
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ReportNotice1 from '@/components/ReportNotice1.vue';
import ReportNotice2 from '@/components/ReportNotice2.vue';
import ReportNotice3 from '@/components/ReportNotice3.vue';
import ReportNotice4 from '@/components/ReportNotice4.vue';
import ReportNotice5 from '@/components/ReportNotice5.vue';
import ReportNotice6 from '@/components/ReportNotice6.vue';
import ReportService from '@/service/ReportService.js';
import { _mixDate } from '@/utils/utils.js';

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
    const title = ref();
    const date = ref();
    const expired = ref();

    onMounted(async () => {
      const responseNotice = await ReportService.reportNotice({
        pollId: type.value,
      });
      const resData = responseNotice.data;
      console.log(resData);
      if (resData.error) {
        alert(resData.error);
        return;
      }
      title.value = resData.pollNm;
      expired.value = resData.expired;
      date.value = _mixDate(resData.startDate, resData.endDate);
    });

    return {
      type,
      title,
      expired,
      date,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
