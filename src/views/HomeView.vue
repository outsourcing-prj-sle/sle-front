<template>
  <div class="flex flex-col bg-white">
    <AppTopAlert :text="textAlert" :showAlert="showAlert" />
    <AppQRPopup @closePopup="() => closePopup()" v-if="qrURL" class="z-50">
      <img class="aspect-[1]" :src="qrURL" alt="qrcode" />
    </AppQRPopup>
    <!-- 배너 공간 -->
    <section
      class="flex overflow-hidden relative flex-col items-center px-16 pt-12 w-full min-h-[341px] max-md:px-5 max-md:max-w-full"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/44bfc0d261b637f96d1b3558a47aa8b6cb710eb930d38c33def5e5deb0ee6a03?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
        alt=""
        class="object-cover absolute inset-0 size-full"
      />
      <div class="relative w-full max-w-[1089px] max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <div class="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
            <div class="flex relative grow gap-0 max-md:mt-9">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed86a9aedb3a03c3db69359401d01cf0fb9c64d3191e8cc43ad55528075abfef?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
                alt=""
                class="shrink-0 self-start mt-5 aspect-[0.98] w-[43px]"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d1335dfcf5e84495e297ae24d041c9982d39a63d3a1ce7115fdae14192b154d?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
                alt=""
                class="shrink-0 max-w-full aspect-[0.59] w-[174px]"
              />
            </div>
          </div>
          <div class="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
            <div class="relative grow mt-8 max-md:mt-10 max-md:max-w-full">
              <div class="flex gap-5 max-md:flex-col max-md:gap-0">
                <div class="flex flex-col w-[78%] max-md:ml-0 max-md:w-full">
                  <div
                    class="flex relative flex-col max-md:mt-10 max-md:max-w-full"
                  >
                    <div
                      class="flex gap-2 items-end self-center max-md:flex-wrap"
                    >
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3ed17ae2ab2e87d33130431b62d706c917ce8d9218066ae847400e5150f8759?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
                        alt=""
                        class="self-stretch aspect-[3.45] w-[235px]"
                      />
                      <div
                        class="mt-12 text-lg font-medium text-black max-md:mt-10"
                      >
                        과 함께하는
                      </div>
                      <div
                        class="flex-auto mt-11 text-2xl font-bold text-violet-950 max-md:mt-10"
                      >
                        SEL 사회정서학습
                      </div>
                    </div>
                    <div
                      class="mt-12 text-lg font-medium leading-6 text-center text-red-600 max-md:mt-10 max-md:max-w-full"
                    >
                      ‘ID’란 자신의
                      <span class="font-bold text-red-600">고유한 정체성</span
                      >(Identity)으로
                      <span class="font-bold text-red-600"
                        >‘SEL 사회정서학습’ </span
                      >학습분석 결과를 통해
                      <br />
                      <span class="text-gray-500">스스로 관찰하고 원하는 </span>
                      목표<span class="text-gray-500">와 꿈을 발견</span>하여,
                      <br />
                      이를 실현하기 위해 반응하는
                      <span class="font-bold text-red-600"
                        >아동으로 성장하는 것을 의미</span
                      >합니다.
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col ml-5 w-[22%] max-md:ml-0 max-md:w-full"
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/911d47c357c79dcfd62f5b1c1bb5d4c0bfae0a5cdc09fb9f1b491894c5b43d04?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
                    alt=""
                    class="grow shrink-0 mt-2 max-w-full aspect-[0.64] w-[163px] max-md:mt-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      class="flex flex-col px-14 mt-24 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
    >
      <!-- 목록1 -->
      <div
        class="flex gap-5 justify-between items-start w-full max-md:flex-wrap max-md:max-w-full"
      >
        <div class="flex flex-col mt-2.5 text-neutral-700">
          <div class="text-xl text-left font-bold">미참여 활동</div>
          <div class="mt-3 text-base font-semibold">
            마감 기감에 맞춰 참여해주세요.
          </div>
        </div>
        <AppDropdown
          :options="options"
          :startText="selectedOption"
          @update:selectedOption="handleSelection"
        />
      </div>
      <div
        class="flex gap-4 justify-between mt-6 text-base font-medium text-neutral-700 max-md:flex-wrap"
      >
        <div
          class="justify-center flex items-center px-5 my-auto bg-black rounded-full h-[55px] w-[55px] max-md:pr-5"
        >
          <img
            src="./../assets/img/left_arrow.png"
            alt="left_arrow1"
            class="shrink-0 max-w-full"
          />
        </div>

        <div
          class="flex flex-1 gap-4 mt-6 text-base font-medium text-neutral-700 max-md:flex-wrap overflow-scroll no-scrollbar"
        >
          <article
            class="flex flex-col relative pt-10 px-6 bg-white rounded-xl border-2 border-blue-500 border-solid pb-[124px]"
          >
            <div class="self-center text-xl font-bold">마음알기 설문1</div>
            <div class="mt-8 max-md:mr-2.5">2023. 09. 01 ~ 12. 01</div>
            <div class="self-center mt-3.5 text-red-600">D-70</div>
            <div class="w-[206px] flex gap-1.5">
              <button
                class="items-center flex-1 px-2 py-2.5 mt-8 text-white whitespace-nowrap bg-blue-500 rounded-[30px] max-md:px-5 max-md:mr-2.5 overflow-hidden text-ellipsis"
                v-if="loginType === 'student'"
                @click="() => goReportNotice(1)"
              >
                시작하기
              </button>
              <button
                class="items-center flex-1 px-2 py-2.5 mt-8 text-white whitespace-nowrap bg-blue-500 rounded-[30px] max-md:px-5 max-md:mr-2.5 overflow-hidden text-ellipsis"
                v-if="loginType === 'teacher'"
                @click="() => copyURL(1)"
              >
                URL 복사
              </button>
              <button
                class="items-center flex-1 px-2 py-2.5 mt-8 text-white whitespace-nowrap bg-blue-700 rounded-[30px] max-md:px-5 max-md:mr-2.5 overflow-hidden text-ellipsis"
                v-if="loginType === 'teacher'"
                @click="() => openQRCodePopup(1)"
              >
                QR 코드
              </button>
            </div>
            <img
              src="./../assets/img/person_icn.png"
              alt="person_icn"
              class="self-end max-w-full aspect-[1.28] w-[116px] absolute bottom-0 right-1.5"
            />
          </article>
          <article
            class="flex flex-col relative pt-10 px-6 bg-white rounded-xl border-2 border-blue-500 border-solid pb-[124px]"
          >
            <div class="self-center text-xl font-bold">마음알기 설문2</div>
            <div class="mt-8 max-md:mr-2.5">2023. 09. 01 ~ 12. 01</div>
            <div class="self-center mt-3.5 text-red-600">D-70</div>
            <div class="w-[206px] flex gap-1.5">
              <button
                class="items-center flex-1 px-2 py-2.5 mt-8 text-white whitespace-nowrap bg-blue-700 rounded-[30px] max-md:px-5 max-md:mr-2.5 overflow-hidden text-ellipsis"
                v-if="loginType === 'student'"
              >
                이어서 진행하기
              </button>
              <button
                class="items-center flex-1 px-2 py-2.5 mt-8 text-white whitespace-nowrap bg-blue-500 rounded-[30px] max-md:px-5 max-md:mr-2.5 overflow-hidden text-ellipsis"
                v-if="loginType === 'teacher'"
              >
                URL 복사
              </button>
              <button
                class="items-center flex-1 px-2 py-2.5 mt-8 text-white whitespace-nowrap bg-blue-700 rounded-[30px] max-md:px-5 max-md:mr-2.5 overflow-hidden text-ellipsis"
                v-if="loginType === 'teacher'"
                @click="openQRCodePopup"
              >
                QR 코드
              </button>
            </div>
            <img
              src="./../assets/img/person_icn.png"
              alt="person_icn"
              class="self-end max-w-full aspect-[1.28] w-[116px] absolute bottom-0 right-1.5"
            />
          </article>
        </div>

        <div
          class="justify-center flex items-center px-5 my-auto bg-black rounded-full h-[55px] w-[55px] max-md:pr-5"
        >
          <img
            src="./../assets/img/right_arrow.png"
            alt="right_arrow1"
            class="shrink-0 max-w-full"
          />
        </div>
      </div>

      <!-- 목록2 -->
      <div
        class="flex gap-5 justify-between items-start w-full max-md:flex-wrap max-md:max-w-full"
      >
        <div class="flex flex-col mt-2.5 text-neutral-700">
          <div class="text-xl text-left font-bold">참여 활동</div>
          <div class="mt-3 text-base font-semibold">
            참여한 활동 목록입니다.
          </div>
        </div>
      </div>
      <div
        class="flex gap-4 justify-between mt-6 text-base font-medium text-neutral-700 max-md:flex-wrap"
      >
        <div
          class="justify-center flex items-center px-5 my-auto bg-black rounded-full h-[55px] w-[55px] max-md:pr-5"
        >
          <img
            src="./../assets/img/left_arrow.png"
            alt="left_arrow2"
            class="shrink-0 max-w-full"
          />
        </div>

        <div
          class="flex flex-1 gap-4 mt-6 text-base font-medium text-neutral-700 max-md:flex-wrap overflow-scroll no-scrollbar"
        >
          <article
            class="flex flex-col relative pt-10 px-6 bg-white rounded-xl border-2 border-zinc-600 border-solid pb-[124px]"
          >
            <div
              class="self-center text-xl font-bold text-center text-neutral-700"
            >
              마음알기 설문5
            </div>
            <div
              class="mt-8 text-base font-medium text-neutral-700 max-md:mr-2.5"
            >
              2023. 09. 01 ~ 12. 01
            </div>
            <button
              class="justify-center w-[206px] items-center px-5 py-3 mt-8 text-white whitespace-nowrap bg-zinc-600 rounded-[30px] max-md:px-5 max-md:mr-2.5 overflow-hidden"
            >
              활동 참여가 완료되었어요!
            </button>
            <img
              src="./../assets/img/person_bubble_icn.png"
              alt="person_icn"
              class="self-end max-w-full aspect-[1.6] w-[170px] absolute bottom-0 right-1.5"
            />
          </article>
        </div>

        <div
          class="justify-center flex items-center px-5 my-auto bg-black rounded-full h-[55px] w-[55px] max-md:pr-5"
        >
          <img
            src="./../assets/img/right_arrow.png"
            alt="right_arrow2"
            class="shrink-0 max-w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import AppDropdown from '../components/AppDropdown.vue';
import AppTopAlert from '../components/AppTopAlert.vue';
import AppQRPopup from '../components/AppQRPopup.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppDropdown,
    AppTopAlert,
    AppQRPopup,
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

    const handleSelection = (option) => {
      selectedOption.value = option;
    };

    onMounted(async () => {});

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
