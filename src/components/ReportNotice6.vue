<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div
      class="flex gap-1 items-start self-stretch max-md:flex-wrap max-md:max-w-full"
    >
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">마음알기 설문6</h1>
        <h2 class="mt-1 text-2xl text-neutral-700 text-left">안내사항</h2>
        <img
          src="@/assets/img/minichar.png"
          alt="minichar"
          class="self-center mt-4 aspect-[1.08] w-[114px]"
        />
      </div>
      <article
        class="flex flex-col grow shrink-0 self-end mt-9 font-medium text-black basis-0 w-fit max-md:max-w-full"
      >
        <div class="self-end text-base leading-8">
          기간 : YYYY년 MM월 DD일 ~ MM월 DD일
        </div>
        <div class="flex gap-2.5 self-start mt-1.5 max-md:flex-wrap">
          <img
            src="@/assets/img/speaker.png"
            alt="speaker"
            class="shrink-0 aspect-square w-[25px]"
          />
          <p class="flex-auto my-auto max-md:max-w-full">
            클릭시 안내음성을 들을 수 있습니다. 단, 안내음성은 1회만 들을 수
            있습니다.
          </p>
        </div>
        <section
          class="justify-center mt-2 items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          다음 지시를 따라 주시기 바랍니다.<br /><br />각 질문을 주의 깊게 읽고
          질문에 가장 잘 맞는 얼굴 표정을 만들어보세요.<br />다양한 ‘눈’ 그림과
          ‘코와 입’ 그림 중에서 ‘눈’ 그림 1개, ‘코와 입’ 그림 1개를 선택해서
          표정을 완성할 수 있어요.
        </section>
        <section
          class="justify-center mt-3 items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          예시 질문: OOO님이 지금 느끼는 감정을 가장 잘 표현할 수 있는 얼굴
          표정을 만들어볼까요?
        </section>

        <section
          class="self-center px-4 pt-7 pb-3 mt-3 w-full rounded-xl border border-solid border-neutral-300 max-md:px-5"
        >
          <div class="flex gap-5 max-md:flex-col max-md:gap-0">
            <div class="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
              <FaceImg
                :face="face[faceIndex]"
                :eyes="eyesIndex >= 0 && eyes[eyesIndex]"
                :mouth="mouthIndex >= 0 && mouth[mouthIndex]"
              />
            </div>
            <div class="flex ml-5 w-[56%] max-md:ml-0 max-md:w-full">
              <FaceSelectList
                :title="'눈'"
                :itemList="eyes"
                :selected="eyesIndex"
                @selectItem="(index) => selectIndex(index, 'eyes')"
              />
              <div
                class="mx-2 h-full border-2 border-l border-solid border-gray-700"
              ></div>
              <FaceSelectList
                :title="'코와 입'"
                :itemList="mouth"
                :selected="mouthIndex"
                @selectItem="(index) => selectIndex(index, 'mouth')"
              />
            </div>
          </div>
        </section>

        <section
          class="justify-center text-left mt-3 items-start px-7 py-7 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 max-md:px-5"
        >
          질문에서 맞거나 틀린 답은 없습니다. 솔직하게 모든 질문에
          답해주세요.<br />결정하기 어렵더라도 각 질문마다 최선을 다해
          답해주세요.<br /><br />자, 준비되었나요? 준비가 되었다면 ‘시작’을 눌러
          시작해보세요!
        </section>
      </article>
    </div>
    <button
      class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
      v-if="eyesIndex > -1 && mouthIndex > -1"
      @click="startReport"
    >
      시작
    </button>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FaceImg from '@/components/FaceImg.vue';
import FaceSelectList from '@/components/FaceSelectList.vue';

export default {
  name: 'ReportNotice6',
  components: { FaceImg, FaceSelectList },
  props: {
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    expired: {
      type: Boolean,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const type = ref(route.params.type || 6);
    const score = ref();
    const face = ref([
      require('@/assets/img/6q1.png'),
      require('@/assets/img/6q2.png'),
      require('@/assets/img/6q3.png'),
      require('@/assets/img/6q4.png'),
    ]);
    const eyes = ref([
      require('@/assets/img/6a11.png'),
      require('@/assets/img/6a12.png'),
      require('@/assets/img/6a13.png'),
      require('@/assets/img/6a14.png'),
      require('@/assets/img/6a15.png'),
      require('@/assets/img/6a16.png'),
    ]);
    const mouth = ref([
      require('@/assets/img/6a21.png'),
      require('@/assets/img/6a22.png'),
      require('@/assets/img/6a23.png'),
      require('@/assets/img/6a24.png'),
      require('@/assets/img/6a25.png'),
      require('@/assets/img/6a26.png'),
    ]);
    const faceIndex = ref(0);
    const eyesIndex = ref(-1);
    const mouthIndex = ref(-1);

    const startReport = () => {
      if (props.expired) {
        alert('기간이 지났습니다.');
        return;
      }
      router.push({
        name: 'reportQuestion',
        params: { type: type.value },
      });
    };

    const selectIndex = (index, type) => {
      if (type === 'eyes') eyesIndex.value = index;
      if (type === 'mouth') mouthIndex.value = index;
    };

    return {
      type,
      score,
      face,
      eyes,
      mouth,
      faceIndex,
      eyesIndex,
      mouthIndex,
      startReport,
      selectIndex,
    };
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
input:checked + div div {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));
}
</style>
