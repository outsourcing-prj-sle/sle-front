<template>
  <footer
    class="flex flex-col justify-center mt-10 w-full text-base text-black max-md:mt-10 max-md:max-w-full"
    v-if="showFooter"
  >
    <div
      class="flex flex-col px-20 py-9 w-full border-t border-solid border-zinc-100 max-md:px-5 max-md:max-w-full"
    >
      <div
        class="flex justify-between gap-5 mt-2 max-md:flex-wrap max-md:max-w-full items-center"
      >
        <div class="my-auto max-md:max-w-full text-left font-bold">
          <div class="mb-[20px]">{{ $t('footer.policy_title') }}</div>
          <div>(51430) 경남 창원시 성산구 중앙대로 241</div>
          <div class="flex gap-[10px]">
            <div>대표전화 055)268-1004</div>
            <div>팩스 055)268-1400)</div>
          </div>
          <div>
            Copyright© Gyeongsangnamdo office of education all rights reserved.
          </div>
        </div>
        <img src="@/assets/img/logo_company.png" alt="logo" class="h-full" />
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const showFooter = computed(() => route.meta.footerVisible);

    return {
      showFooter,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
