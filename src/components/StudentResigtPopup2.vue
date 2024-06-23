<template>
  <div class="flex flex-col flex-1 text-base font-medium">
    <span class="text-left mt-10"> 성별을 선택해주세요. </span>

    <div class="mt-4 flex gap-6 justify-center items-center">
      <label class="cursor-pointer"
        ><input type="radio" value="F" v-model="gender" class="mr-1 hidden" />
        <div
          class="flex rounded-3xl p-2"
          :class="{
            'border-4 border-blue-400': gender === 'F',
            ' border-2 border-gray-400': gender !== 'F',
          }"
        >
          <img
            src="@/assets/img/gender_F.png"
            alt="gender_F"
            class="h-[151px] w-[125px]"
          />
        </div>
      </label>
      <label class="cursor-pointer"
        ><input type="radio" value="M" v-model="gender" class="mr-1 hidden" />
        <div
          class="flex rounded-3xl p-2"
          :class="{
            ' border-2 border-gray-400': gender !== 'M',
            'border-4 border-blue-400': gender === 'M',
          }"
        >
          <img
            src="@/assets/img/gender_M.png"
            alt="gender_M"
            class="h-[151px] w-[125px]"
          />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  setup(props, { emit }) {
    const gender = ref();
    watch(gender, (newValue, oldValue) => {
      emit('changeGender', newValue);
    });

    return { gender };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
