<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div class="flex gap-1 items-start self-stretch max-md:max-w-full">
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">
          {{ $t(`report${nttNo}.title`) }}
        </h1>
        <h2 class="mt-1 text-2xl text-neutral-700 text-left">
          {{ $t('report.notification') }}
        </h2>
        <img
          src="@/assets/img/minichar.png"
          alt="minichar"
          class="self-center mt-4 aspect-[1.08] w-[114px]"
        />
      </div>
      <article
        class="flex flex-col grow shrink-0 self-end mt-9 font-medium text-black basis-0 w-fit max-md:max-w-full"
      >
        <div class="self-end text-base leading-8 max-lg:text-sm max-md:text-xs">
          {{ $t('report.period') }} : {{ date }}
        </div>
        <section
          class="justify-center items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full max-lg:text-sm max-md:text-xs"
          v-html="$t(`report${nttNo}.auuounce_content`)"
        ></section>
      </article>
    </div>

    <ReportNotice1 v-if="title === '마음알기 설문1'" @allowNext="allowNext" />
    <ReportNotice2 v-if="title === '마음알기 설문2'" @allowNext="allowNext" />
    <ReportNotice3 v-if="title === '마음알기 설문3'" @allowNext="allowNext" />
    <ReportNotice4 v-if="title === '마음알기 설문4'" @allowNext="allowNext" />
    <ReportNotice5 v-if="title === '마음알기 설문5'" @allowNext="allowNext" />
    <ReportNotice6 v-if="title === '마음알기 설문6'" @allowNext="allowNext" />

    <section
      class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:max-w-full w-full max-lg:text-sm max-md:text-xs"
      v-if="isAllowed && showAuuounce2"
    >
      {{ $t(`report${nttNo}.auuounce_content2`) }}
    </section>
    <button
      class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
      v-if="isAllowed"
      @click="startReport"
    >
      {{ $t('common.start') }}
    </button>
  </section>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
    const router = useRouter();
    const type = ref(route.params.type || 1);
    const title = ref();
    const date = ref();
    const expired = ref();
    const nttNo = ref();
    const isAllowed = ref(false);

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
      nttNo.value = resData.nttNo;
    });

    const showAuuounce2 = computed(() => {
      const ary = ['1'];
      let flag = ary.includes(nttNo.value);
      return flag;
    });

    const startReport = () => {
      if (expired.value) {
        alert('기간이 지났습니다.');
        return;
      }
      router.push({
        name: 'reportQuestion',
        params: { type: type.value },
      });
    };

    const allowNext = (flag) => {
      console.log('1234');
      console.log(flag);
      isAllowed.value = flag;
    };

    return {
      type,
      title,
      expired,
      date,
      nttNo,
      isAllowed,
      showAuuounce2,
      startReport,
      allowNext,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
