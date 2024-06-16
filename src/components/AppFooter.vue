<template>
    <footer
      class="flex flex-col justify-center mt-10 w-full text-base text-white bg-zinc-500 max-md:mt-10 max-md:max-w-full"
      v-if="showFooter"
    >
      <div
        class="flex flex-col px-20 py-9 w-full bg-sky-800 border-t border-solid border-zinc-100 max-md:px-5 max-md:max-w-full"
      >
        <div
          class="flex justify-between gap-5 mt-2 max-md:flex-wrap max-md:max-w-full"
        >
          <div class="my-auto max-md:max-w-full text-left">
            <div>개인정보처리방침</div>
            <div>
              세종특별자치시 남세종로 446 스마트허브4차 504호<br>TEL : 044-715-7915
            </div>
            <div>
              FAX : 070-4324-7900<br>COPYRIGHT© DATAEUM 2024. ALL RIGHT RESERVED.
            </div>
          </div>
          <img
            src="./../assets/img/logo_company.png"
            alt="logo"
            class="shrink-0 max-w-full aspect-[3.57] w-[164px]"
          />
        </div>
      </div>
    </footer>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const showFooter = computed(() => route.meta.footerVisible)
    
    return {
      showFooter,
    }
  }
}
</script>

<style>
/* Footer 스타일 */
</style>
