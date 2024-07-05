<template>
  <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md content-center p-8 space-y-8 min-h-[350px] bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2"
      style="transform: translate(-50%, -50%)"
    >
      <p class="text-lg">SEL 설문관리</p>
      <p class="text-base">SEL 활동명 : 마음알기 설문1</p>
      <div class="flex flex-col gap-[10px] text-sm">
        <p>기간 설정</p>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-[20px]">
            <p>시작일</p>
            <VDatePicker v-model="startDate">
              <template #default="{ togglePopover }">
                <div class="flex items-center gap-2">
                  <button
                    class="px-10 py-2.5 text-[#797979] rounded-xl text-xs font-light bg-white border-[#CECECE] border border-solid"
                    @click="togglePopover"
                  >
                    {{ formattedStartDate }}
                  </button>
                  <button
                    class="p-2.5 rounded-xl bg-white border-[#CECECE] border border-solid"
                    @click="togglePopover"
                  >
                    <img
                      class="w-6 h-6"
                      src="@/assets/img/IDCalendar.png"
                      alt="IDCalendar"
                    />
                  </button>
                </div>
              </template>
            </VDatePicker>
          </div>
          <div class="flex items-center gap-[20px]">
            <p>종료일</p>
            <VDatePicker v-model="endDate">
              <template #default="{ togglePopover }">
                <div class="flex items-center gap-2">
                  <button
                    class="px-10 py-2.5 text-[#797979] rounded-xl text-xs font-light bg-white border-[#CECECE] border border-solid"
                    @click="togglePopover"
                  >
                    {{ formattedEndDate }}
                  </button>
                  <button
                    class="p-2.5 rounded-xl bg-white border-[#CECECE] border border-solid"
                    @click="togglePopover"
                  >
                    <img
                      class="w-6 h-6"
                      src="@/assets/img/IDCalendar.png"
                      alt="IDCalendar"
                    />
                  </button>
                </div>
              </template>
            </VDatePicker>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[10px] text-sm">
        <div class="flex gap-[20px] items-center">
          <p>학교</p>
          <label
            for="option1"
            class="shrink-0 self-stretch my-auto flex justify-center items-center"
          >
            <input
              type="radio"
              name="activityQuestion"
              id="option1"
              value="1"
            />
            <div
              class="w-7 h-7 max-sm:w-5 max-sm:h-5 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px] cursor-pointer"
            >
              <div class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full">학교/학년 전체</div>
            </div>
          </label>
          <label
            for="option2"
            class="shrink-0 self-stretch my-auto flex justify-center items-center"
          >
            <input
              type="radio"
              name="activityQuestion"
              id="option2"
              value="2"
            />
            <div
              class="w-7 h-7 max-sm:w-5 max-sm:h-5 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px] cursor-pointer"
            >
              <div class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full">특정 학교 직접 선택</div>
            </div>
          </label>
        </div>
        <div class="flex gap-[10px]">
          <IDButton :text="'asdf'" :isWhite="true" :_width="250" />
          <IDButton :text="'asdf'" :isWhite="true" :_width="200" />
          <IDButton :text="'asdf'" :isWhite="true" :_width="150" />
          <IDButton :text="'asdf'" :isWhite="true" :_width="100" />
        </div>
        <div>

        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';
import IDTable from '@/components/id/IDTable.vue';
import IDButton from '@/components/id/IDButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  props: {
      keyword: {
          type: String
      },
      placeholder: {
          type: String
      },
      _width: {
          type: Number,
          default: 1000
      },
  },
  components: {
    IDButton,
    IDTable,
    AppDropdown,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const IDStore = useIDStore();
    const options = ref([123, 456]);
    const selectedOption = ref('전체보기');
    const handleSelection1 = (v) => {
      console.log(v);
    };
    const header = ref([
      {
        isCheckbox: true,
      },
      {
        text: '번호',
      },
      {
        text: '활동명',
      },
      {
        text: '대상',
      },
      {
        text: '기간',
      },
      {
        text: '상세',
      },
      {
        text: '관리',
      },
    ]);
    const body = ref([
      [
        {
          isCheckbox: true,
        },
        {
          text: '번호',
        },
        {
          text: '활동명',
        },
        {
          text: '대상',
        },
        {
          text: '기간',
        },
        {
          text: '상세',
        },
        {
          text: '관리',
        },
      ],
    ]);

    const startDate = ref(new Date());
    const endDate = ref(new Date());
    const formattedStartDate = computed(() => {
      const tmp = new Date(date.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });
    const formattedEndDate = computed(() => {
      const tmp = new Date(date.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });

    return {
      options,
      selectedOption,
      header,
      body,
      startDate,
      endDate,
      formattedStartDate,
      formattedEndDate,

      handleSelection1,
    };
  },
};
</script>

<style scoped></style>
