<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div
      class="flex gap-1 items-start self-stretch max-md:flex-wrap max-md:max-w-full"
    >
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">{{ title }}</h1>
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
        <div class="self-end text-base leading-8">기간 : {{ date }}</div>
        <section
          class="justify-center items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full mt-1"
        >
          <p>
            다음 지시를 따라 주시기 바랍니다.<br /><br />이 화면에는 그림과
            감정을 나타내는 단어들이 있습니다.<br />각 문장을 주의 깊게 듣고 1,
            2, 3, 4 보기 중 하나를 선택해주세요.<br />
          </p>
          <p class="text-red-600">
            안내음성은 1번만 들을 수 있으니 조용한 장소에서 잘 듣고
            선택해주세요.
          </p>
          <p>준비되었나요? ‘시작’을 눌러 시작해보세요!</p>
        </section>
      </article>
    </div>
    <button
      class="justify-center px-10 py-3 mt-20 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
      @click="startReport"
    >
      시작
    </button>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';

export default {
  name: 'LoginView',
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const userId = computed(() => userStore.id);
    const type = ref(route.params.type || 1);
    const title = ref('마음알기 설문5');
    const date = ref('YYYY년 MM월 DD일 ~ MM월 DD일');

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      // todo : 설문 문제 확인 api호출. with type, 만약 필요하면 userId
      title.value = '마음알기 설문5';
      date.value = 'YYYY년 MM월 DD일 ~ MM월 DD일';
    };

    const startReport = () => {
      router.push({
        name: 'reportQuestion',
        params: { type: type.value },
        // query: { plan: 'private' }
      });
    };

    return {
      title,
      date,
      type,
      startReport,
    };
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
input:checked + div {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));

  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style>
