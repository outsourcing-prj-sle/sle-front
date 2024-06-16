<template>
  <div class="flex flex-col bg-white">
    <AppTopAlert :text="textAlert" :showAlert="showAlert" />
    <AppQRPopup @closePopup="() => closePopup()" v-if="qrURL" class="z-50">
      <img class="aspect-[1]" :src="qrURL" alt="qrcode" />
    </AppQRPopup>
    <!-- 배너 공간 -->
    <section
      class="flex overflow-hidden relative flex-col items-center px-16 pt-12 w-full min-h-[341px] max-md:px-5 max-md:max-w-full max-xl:hidden"
    >
      <img
        src="@/assets/img/mainBanner.png"
        alt=""
        class="object-cover absolute inset-0 size-full"
      />
    </section>

    <section
      class="hidden overflow-hidden relative flex-col items-center w-full max-md:max-w-full max-md:flex"
    >
      <img
        class="w-full"
        src="../../src/assets/img/banner_mobile.png"
        alt="모바일_배너"
      />
    </section>

    <div
      class="flex flex-col px-14 mt-24 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
    >
      <!-- 목록1 -->
      <div
        class="flex gap-5 justify-between items-start w-full max-md:max-w-full z-10"
      >
        <div class="flex flex-col mt-2.5 text-neutral-700">
          <div class="text-xl text-left font-bold">
            {{ loginType === 'student' ? '미참여 활동' : '진행중인 학생 SEL' }}
          </div>
          <div class="mt-3 text-base font-semibold">
            {{
              loginType === 'student'
                ? '마감 기감에 맞춰 참여해주세요.'
                : '마감기간에 맞춰 학생들에게 안내해주세요.'
            }}
          </div>
        </div>
        <AppDropdown
          :options="options"
          :startText="selectedOption"
          @update:selectedOption="handleSelection"
        />
      </div>
      <AppCardItem :options="1" :list="topList" />

      <!-- 목록2 -->
      <div
        class="flex gap-5 justify-between items-start w-full max-md:max-w-full mt-24"
      >
        <div class="flex flex-col mt-2.5 text-neutral-700">
          <div class="text-xl text-left font-bold">
            {{ loginType === 'student' ? '참여 활동' : '마감된 학생 SEL' }}
          </div>
          <div class="mt-3 text-base font-semibold">
            {{
              loginType === 'student'
                ? '참여한 활동 목록입니다.'
                : '활동 기간이 마감되어 만료되었습니다.'
            }}
          </div>
        </div>
      </div>
      <AppCardItem :options="2" :list="bottomList" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import ReportService from '@/service/ReportService.js';
import AppDropdown from '../components/AppDropdown.vue';
import AppTopAlert from '../components/AppTopAlert.vue';
import AppQRPopup from '../components/AppQRPopup.vue';
import AppCardItem from '../components/AppCardItem.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppDropdown,
    AppTopAlert,
    AppQRPopup,
    AppCardItem,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const loginType = computed(() => userStore.type);
    const options = ref(['마감순', '마감순 2', '마감순 3']);
    const selectedOption = ref('마감순');
    const showAlert = ref(false);
    const textAlert = ref('');
    const qrURL = ref('');
    const topList = ref([]);
    const bottomList = ref([]);

    const handleSelection = (option) => {
      selectedOption.value = option;
    };

    onMounted(async () => {
      // todo : api - 메인페이지
      const reportList = await ReportService.reportMainList();
      const resData = reportList.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      topList.value = resData[0];
      bottomList.value = resData[1];
    });

    const goReportNotice = (type = 1) => {
      router.push({
        name: 'reportNotice',
        params: { type: type },
      });
    };

    const copyURL = async (type = 1) => {
      try {
        await navigator.clipboard.writeText(
          `${window.location.host}/report/notice/${type}`
        );
        showAlert.value = true;
        textAlert.value = 'URL이 복사되었습니다.';
        setTimeout(() => {
          showAlert.value = false;
          textAlert.value = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    const openQRCodePopup = (type = 1) => {
      const url = `${window.location.host}/report/notice/${type}`;
      qrURL.value = `https://quickchart.io/qr?text=${url}&size=250`;
    };

    const closePopup = () => {
      qrURL.value = ``;
    };

    return {
      options,
      selectedOption,
      loginType,
      showAlert,
      textAlert,
      qrURL,

      handleSelection,
      goReportNotice,
      copyURL,
      openQRCodePopup,
      closePopup,
    };
  },
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge, and Opera */
}

.no-scrollbar {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
</style>
