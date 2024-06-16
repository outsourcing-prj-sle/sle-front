<template>
  <div
    v-if="type === 1"
    class="flex gap-4 justify-between mt-6 text-base font-medium text-neutral-700 max-md:flex-wrap"
  >
    <div
      @click="clickPrev"
      class="justify-center flex items-center px-5 my-auto bg-black rounded-full h-[55px] w-[55px] max-md:pr-5"
    >
      <img
        src="./../assets/img/left_arrow.png"
        alt="left_arrow1"
        class="shrink-0 max-w-full"
      />
    </div>

    <div
      ref="cardSlider"
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
      <article
        class="flex flex-col relative pt-10 px-6 bg-white rounded-xl border-2 border-blue-500 border-solid pb-[124px]"
      >
        <div class="self-center text-xl font-bold">마음알기 설문3</div>
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
      <article
        class="flex flex-col relative pt-10 px-6 bg-white rounded-xl border-2 border-blue-500 border-solid pb-[124px]"
      >
        <div class="self-center text-xl font-bold">마음알기 설문4</div>
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
      <article
        class="flex flex-col relative pt-10 px-6 bg-white rounded-xl border-2 border-blue-500 border-solid pb-[124px]"
      >
        <div class="self-center text-xl font-bold">마음알기 설문6</div>
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
      <article
        class="flex flex-col relative pt-10 px-6 bg-white rounded-xl border-2 border-blue-500 border-solid pb-[124px]"
      >
        <div class="self-center text-xl font-bold">마음알기 설문7</div>
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
      @click="clickNext"
      class="justify-center flex items-center px-5 my-auto bg-black rounded-full h-[55px] w-[55px] max-md:pr-5"
    >
      <img
        src="./../assets/img/right_arrow.png"
        alt="right_arrow1"
        class="shrink-0 max-w-full"
      />
    </div>
  </div>

  <div
    v-if="type === 2"
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
        <div class="self-center text-xl font-bold text-center text-neutral-700">
          마음알기 설문5
        </div>
        <div class="mt-8 text-base font-medium text-neutral-700 max-md:mr-2.5">
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
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/store/userStore.js';

export default {
  name: 'AppCardItem',
  props: {
    options: {
      type: String,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const loginType = computed(() => userStore.type);
    const type = props.options;
    const cardSlider = ref(null);
    const articleWidth = ref(0);
    const nowScrollX = ref(0);

    onMounted(async () => {
      console.log(type);

      articleWidth.value = document.querySelector('article').offsetWidth;
    });

    const clickPrev = () => {
      nowScrollX.value -= articleWidth.value + 16;

      if (nowScrollX.value < 0) nowScrollX.value = 0;

      cardSlider.value.scrollLeft = nowScrollX.value;
    };

    const clickNext = () => {
      if (
        cardSlider.value.scrollWidth - cardSlider.value.clientWidth >=
        nowScrollX.value + articleWidth.value + 16
      ) {
        nowScrollX.value += articleWidth.value + 16;
      }

      cardSlider.value.scrollLeft = nowScrollX.value;
    };

    return {
      type,
      loginType,
      articleWidth,
      nowScrollX,
      cardSlider,
      clickPrev,
      clickNext,
    };
  },
};
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
