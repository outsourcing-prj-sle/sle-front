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
        <div class="self-end text-base leading-8 max-lg:text-sm max-md:text-xs">기간 : {{ date }}</div>
        <section
          class="justify-center items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full mt-1 max-lg:text-sm max-md:text-xs"
        >
          다음 지시를 따라 주시기 바랍니다.<br /><br />활동이 시작되면 검은 화면
          안에 사람의 사진이 나타납니다.<br />사진은
          <span class="text-red-600">1초 동안</span>만 나타납니다. 주의 깊게
          보고 사진 속사람이 생각하고 있거나 느끼는 것을 가장 잘 설명하는 단어를
          가능한 한 빨리 선택해 주세요.<br /><span class="text-red-600"
            >시작을 누르면 화면에 3, 2, 1 순서로 숫자가 나온 후 활동이
            시작됩니다.</span
          >
          <br />준비되었나요? ‘시작’을 눌러 시작해보세요!
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
    const title = ref('마음알기 설문4');
    const date = ref('YYYY년 MM월 DD일 ~ MM월 DD일');

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      // todo : 설문 문제 확인 api호출. with type, 만약 필요하면 userId
      title.value = '마음알기 설문4';
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
