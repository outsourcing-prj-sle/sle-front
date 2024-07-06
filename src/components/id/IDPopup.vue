<template>
  <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-50" v-if="isShow1 || isShow2" @click="togglePopup(false)"></div>
    <div v-if="isShow1"
      class="content-center p-8 min-h-[350px] z-50 bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2 flex flex-col gap-[10px]"
      style="transform: translate(-50%, -50%)"
    >
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold">SEL 설문관리</p>
        <button class="text-2xl font-bold" @click="togglePopup(false)">x</button>
      </div>
      <p class="text-base text-left font-semibold">SEL 활동명 : 마음알기 설문1</p>
      <div class="flex flex-col gap-[10px] text-sm items-start mt-[10px]">
        <p class="text-left text-[#2F80ED] font-semibold">기간 설정</p>
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-[20px]">
            <p class="w-[50px] text-left">시작일</p>
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
                    class="py-2 px-3 rounded-xl bg-white border-[#CECECE] border border-solid"
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
            <p class="w-[50px] text-left">종료일</p>
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
                    class="py-2 px-3 rounded-xl bg-white border-[#CECECE] border border-solid"
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
      <div class="flex flex-col gap-[10px] text-sm items-start mt-[10px]">
        <p class="text-left text-[#2F80ED] font-semibold">대상 설정</p>
        <div class="flex flex-col gap-[20px] text-sm">
          <div class="flex gap-[20px] items-center">
            <p class="w-[50px] text-left">학교</p>
            <div class="flex gap-[10px]">
              <input type="radio" id="option1" value="1" />
              <label class="cursor-pointer" for="option1">학교/학년 전체</label>
            </div>
            <div class="flex gap-[10px]">
              <input type="radio" id="option2" value="1" />
              <label class="cursor-pointer" for="option2">특정 학교 직접 선택</label>
            </div>
          </div>
          <div class="flex gap-[10px] items-center">
            <p class="w-[50px] text-left">학교급</p>
            <IDButton :text="'초등학교'" :isWhite="true" :_width="100" class="hover:bg-[#2F80ED] hover:text-white text-black" />
            <IDButton :text="'중학교'" :isWhite="true" :_width="100" class="hover:bg-[#2F80ED] hover:text-white text-black" />
            <IDButton :text="'고등학교'" :isWhite="true" :_width="100" class="hover:bg-[#2F80ED] hover:text-white text-black" />
          </div>
          <div class="flex gap-[10px] items-center">
            <p class="w-[50px] text-left">학교급</p>
            <IDButton :text="'학교검색'" :isWhite="false" :_width="100" />
          </div>
          <div class="flex gap-[10px] items-center">
            <p class="w-[50px] text-left">학년</p>
            <IDButton :text="'1학년'" :isWhite="true" :_width="70" class="hover:bg-[#2F80ED] hover:text-white text-black" />
            <IDButton :text="'2학년'" :isWhite="true" :_width="70" class="hover:bg-[#2F80ED] hover:text-white text-black" />
            <IDButton :text="'3학년'" :isWhite="true" :_width="70" class="hover:bg-[#2F80ED] hover:text-white text-black" />
            <IDButton :text="'4학년'" :isWhite="true" :_width="70" class="hover:bg-[#2F80ED] hover:text-white text-black" />
            <IDButton :text="'5학년'" :isWhite="true" :_width="70" class="hover:bg-[#2F80ED] hover:text-white text-black" />
            <IDButton :text="'6학년'" :isWhite="true" :_width="70" class="hover:bg-[#2F80ED] hover:text-white text-black" />
          </div>
        </div>
      </div>
      <div class="flex text-sm justify-center mt-[10px]">
        <IDButton :text="'추가'" :_width="150" isGray="true" @click="toggleSubPopup" class="bg-gray-300 text-white" />
      </div>
      <p class="text-base text-left font-semibold">목록</p>
      <div class="w-full bg-gray-100 min-h-[200px] rounded-md flex p-[10px] pt-[20px] gap-[10px] flex-wrap">
        <div>
          <IDButton :text="'초등학교-3학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'초등학교-4학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'초등학교-5학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'초등학교-6학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'중학교-1학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'중학교-2학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'중학교-3학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'고등학교-1학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'고등학교-2학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
        <div>
          <IDButton :text="'고등학교-3학년'" :_width="120" :isWhite="true" class="h-[40px] text-black btn-selected"  />
        </div>
      </div>

      <div v-if="isShow2"
      class="content-center p-8 z-50 bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2 flex flex-col gap-[10px] min-w-[500px]"
      style="transform: translate(-50%, -50%)"
      >
        <div class="flex justify-between items-center">
          <p class="text-lg font-bold">학교검색</p>
          <button class="text-2xl font-bold" @click="toggleSubPopup">x</button>
        </div>
        <IDSearch class="w-full"
        :placeholder="'학교명을 입력해주세요.'"
        />
        <div class="flex items-center gap-[20px]">
          <AppDropdown
          :options="options1"
          :startText="selectedOption1"
          :openFull="true"
          @update:selectedOption="handleSelection1"
          />
          <AppDropdown
          :options="options2"
          :startText="selectedOption2"
          :openFull="true"
          @update:selectedOption="handleSelection1"
          />
        </div>
        <div class="w-full flex flex-col gap-[10px]">
          <div class="w-full bg-gray-100 rounded-md flex p-[10px] gap-[5px] flex-wrap flex-col cursor-pointer">          
            <p class="text-base text-left font-semibold">아이초등학교</p>
            <p class="text-xs text-gray-500 text-left">충청북도 청주시</p>
          </div>
          <div class="w-full bg-[#2F80ED] text-white rounded-md flex p-[10px] gap-[5px] flex-wrap flex-col cursor-pointer">
            <p class="text-base text-left font-semibold">톡톡초등학교</p>
            <p class="text-xs text-left">충청북도 청주시</p>
            <div class="w-full flex gap-[10px] mt-[10px]">
              <div class="w-[35px]">
                <p class="text-sm text-left font-semibold">학년</p>
              </div>
              <div class="flex gap-[10px] flex-wrap items-center">
                <div>
                  <IDButton :text="'전체'" :_width="60" :isWhite="true" class="h-[30px] text-black text-xs"  />
                </div>
                <div>
                  <IDButton :text="'1학년'" :_width="60" :isWhite="true" class="h-[30px] text-black text-xs"  />
                </div>
                <div>
                  <IDButton :text="'2학년'" :_width="60" :isWhite="true" class="h-[30px] text-black text-xs"  />
                </div>
                <div>
                  <IDButton :text="'3학년'" :_width="60" :isWhite="true" class="h-[30px] text-black text-xs"  />
                </div>
                <div>
                  <IDButton :text="'4학년'" :_width="60" :isWhite="true" class="h-[30px] text-black text-xs"  />
                </div>
                <div>
                  <IDButton :text="'5학년'" :_width="60" :isWhite="true" class="h-[30px] text-black text-xs"  />
                </div>
                <div>
                  <IDButton :text="'6학년'" :_width="60" :isWhite="true" class="h-[30px] text-black text-xs"  />
                </div>
              </div>    
            </div>
            <div class="mt-[10px]">
              <IDButton :text="'추가'" :_width="60" class="h-[30px] border border-gray-400 bg-gray-400 text-xs"  />
            </div>     
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref, watch, onBeforeMount, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import { useStateStore } from '@/store/stateStore.js';
import IDService from '@/service/IDService.js';
import IDButton from '@/components/id/IDButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import IDSearch from '@/components/id/IDSearch.vue';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IDButton,
    IDSearch,
    AppDropdown
  },
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const IDStore = useIDStore();
    const stateStore = useStateStore();
    const isShow1 = ref(props.isShow);
    const isShow2 = ref(false);
    const options1 = ref(['학교급', 456]);
    const options2 = ref(['오름차순', '내림차순']);
    const selectedOption1 = ref('학교급');
    const selectedOption2 = ref('오름차순');
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    const isWork = computed(() => {
      return stateStore.popupFlag;
    });
    const handleSelection1 = (v) => {
      console.log(v);
    };

    watch(
      () => isWork.value,
      (popupFlag) => {
        togglePopup(popupFlag);
      }
    );

    const formattedStartDate = computed(() => {
      const tmp = new Date(startDate.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });
    const formattedEndDate = computed(() => {
      const tmp = new Date(endDate.value);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      const format = `${year}-${month}-${day}`;

      return format;
    });

    const togglePopup = (param) => {
      isShow1.value = param;
      isShow2.value = false;
    };

    const toggleSubPopup = () => {
      isShow2.value = !isShow2.value;
    };

    return {
      isShow1,
      isShow2,
      options1,
      options2,
      selectedOption1,
      selectedOption2,
      startDate,
      endDate,
      formattedStartDate,
      formattedEndDate,

      handleSelection1,
      togglePopup,
      toggleSubPopup
    };
  },
};
</script>

<style scoped>
  .btn-selected::after {
    content: 'x';
    position: relative;
    bottom: 35px;
    left: 100px;
    width: 15px;
    height: 15px;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }
</style>
