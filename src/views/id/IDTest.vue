<template>
  <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md content-center p-8 space-y-8 min-h-[350px] bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2"
      style="transform: translate(-50%, -50%)"
    >
      <div class="flex gap-2">
        <!-- 
          text: 버튼안에 넣을꺼
          isWhite: true - 흰배경 버튼 / 옵션 아에 빼면 파랑 배경 버튼
          _width: 만약 고정된 길이여야하면 숫자 입력시 해당 px로, / 옵션 아에 빼면 그냥 알아서 이쁘게 지정됨
         -->
        <IDButton :text="'asdf'" :isWhite="true" :_width="250" />
        <IDButton :text="'asdf'" :isWhite="true" :_width="200" />
        <IDButton :text="'asdf'" :isWhite="true" :_width="150" />
        <IDButton :text="'asdf'" :isWhite="true" :_width="100" />
        <!-- <IDButton :text="'등록'" :_width="150" /> -->
      </div>
      <div>
        <!-- 
          options(objectOptions랑 택1)
            - 안에 넣을꺼 배열 / ex) ['마감순', '선착순']
          objectOptions(options랑 택1)
            - 안에 넣을꺼 오브젝트로 이루어진 배열 /
              ex) [{name: '선택지1', value: 1}, {name: '선택지2', value: 'code_002'}]
          startText(필수아님)
            - 시작 텍스트 문자열
          updateText(필수아님)
            - 안에있는 택스트 바꾸고싶으면 여기에 넣는 ref 변수를 수정
          openWay (필수아님)
            - 열렸을때 만약 오른쪽에 치중되어있으면 "'left'" 값 추가
          openFull (필수아님)
            - 열리는 창에 w-full 적용 "true" 추가
          @update:selectedOption
            - 옵션 선택 시 핸들링할 함수 넣기
        -->
        <AppDropdown
          :options="options"
          :startText="selectedOption"
          @update:selectedOption="handleSelection1"
        />
      </div>
      <div>
        <VDatePicker v-model="date">
          <template #default="{ togglePopover }">
            <div class="flex items-center gap-2">
              <button
                class="px-10 py-2.5 text-[#797979] rounded-xl text-xs font-light bg-white border-[#CECECE] border border-solid"
                @click="togglePopover"
              >
                {{ formattedDate }}
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
    <div>
      <IDTable :header="header" :body="body" />
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
  name: 'IDManageReportView',
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

    const date = ref(new Date());
    const formattedDate = computed(() => {
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
      date,
      formattedDate,

      handleSelection1,
    };
  },
};
</script>

<style scoped></style>
