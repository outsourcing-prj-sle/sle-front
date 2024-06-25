<template>
  <div class="flex flex-col bg-white">
    <AppTopAlert :text="textAlert" :showAlert="showAlert" />
    <AppQRPopup @closePopup="() => closePopup()" v-if="qrURL" class="z-50">
      <img class="aspect-[1]" :src="qrURL" alt="qrcode" />
    </AppQRPopup>
    <AppRegistPopup
      v-if="!isRegistered"
      class="z-50"
      @closePopup="() => closePopup()"
    />
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
      <AppCardItem
        :options="1"
        :list="topList"
        @_goReportNotice="goReportNotice"
        @_goReportQuestionPage="goReportQuestionPage"
        @_copyURL="copyURL"
        @_openQRCodePopup="openQRCodePopup"
      />

      <!-- 목록2 -->
      <div
        class="flex gap-5 justify-between items-start w-full max-md:max-w-full mt-24"
        v-if="bottomList.length"
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
      <AppCardItem
        v-if="bottomList.length"
        :options="2"
        :list="bottomList"
        @_goReportNotice="goReportNotice"
        @_goReportQuestionPage="goReportQuestionPage"
        @_copyURL="copyURL"
        @_openQRCodePopup="openQRCodePopup"
      />
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
import AppRegistPopup from '@/components/AppRegistPopup.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppDropdown,
    AppTopAlert,
    AppQRPopup,
    AppCardItem,
    AppRegistPopup,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const loginType = computed(() => userStore.type);
    const isRegistered = computed(() => userStore.isRegistered);
    const options = ref(['마감순', '최신순']);
    const selectedOption = ref('마감순');
    const showAlert = ref(false);
    const textAlert = ref('');
    const qrURL = ref('');
    const topList = ref([]);
    const bottomList = ref([]);

    const handleSelection = (option) => {
      selectedOption.value = option;
      if (option === '최신순') {
        sortArrStart(topList.value);
      }
      if (option === '마감순') {
        sortArrEnd(topList.value);
      }
    };

    onMounted(async () => {
      // 메인페이지
      const reportList = await ReportService.reportMainList();
      const resData = reportList.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      topList.value = sortArrEnd(resData.todo);
      bottomList.value = resData.done;
    });

    const goReportNotice = (type = 1) => {
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

    const copyURL = async (type = 1) => {
      const textToCopy = `${window.location.host}/report/notice/${type}`;
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      try {
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');

        showAlert.value = true;
        textAlert.value = 'URL이 복사되었습니다.';
        setTimeout(() => {
          showAlert.value = false;
          textAlert.value = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textarea);
    };

    const openQRCodePopup = (type = 1) => {
      const url = `${window.location.host}/report/notice/${type}`;
      qrURL.value = `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=250`;
    };

    const closePopup = () => {
      qrURL.value = ``;
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

    return {
      options,
      selectedOption,
      loginType,
      isRegistered,
      showAlert,
      textAlert,
      qrURL,
      topList,
      bottomList,

      handleSelection,
      goReportNotice,
      goReportQuestionPage,
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
