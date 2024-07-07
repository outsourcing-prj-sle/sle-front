<template>
  <div
    class="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-50"
    v-if="isShow1 || isShow2"
    @click="togglePopup(false)"
  ></div>
  <div
    v-if="isShow1"
    class="content-center p-8 min-h-[350px] z-50 bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2 flex flex-col gap-[10px]"
    style="transform: translate(-50%, -50%) scale(0.8)"
  >
    <div class="flex justify-between items-center">
      <p class="text-lg font-bold">SEL 설문관리</p>
      <button class="text-2xl font-bold" @click="togglePopup(false)">x</button>
    </div>
    <p class="text-base text-left font-semibold">SEL 활동명 : {{ title }}</p>
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
            <input
              type="radio"
              id="option1"
              value="1"
              v-model="isChooseSchool"
            />
            <label class="cursor-pointer" for="option1">학교/학년 전체</label>
          </div>
          <div class="flex gap-[10px]">
            <input
              type="radio"
              id="option2"
              value="2"
              v-model="isChooseSchool"
            />
            <label class="cursor-pointer" for="option2"
              >특정 학교 직접 선택</label
            >
          </div>
        </div>
        <div class="flex gap-[10px] items-center" v-if="isChooseSchool === '1'">
          <p class="w-[50px] text-left">학교급</p>
          <IDButton
            :text="'초등학교'"
            :isWhite="schValue === 'SCH_02' ? false : true"
            :_width="100"
            @onClick="() => changeSch('SCH_02')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
          <IDButton
            :text="'중학교'"
            :isWhite="schValue === 'SCH_03' ? false : true"
            :_width="100"
            @onClick="() => changeSch('SCH_03')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
          <IDButton
            :text="'고등학교'"
            :isWhite="schValue === 'SCH_04' ? false : true"
            :_width="100"
            @onClick="() => changeSch('SCH_04')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
        </div>
        <div class="flex gap-[10px] items-center" v-if="isChooseSchool === '2'">
          <p class="w-[50px] text-left">학교급</p>
          <IDButton
            :text="'학교검색'"
            :isWhite="false"
            :_width="100"
            @click="toggleSubPopup"
          />
        </div>
        <div class="flex gap-[10px] items-center" v-if="isChooseSchool === '1'">
          <p class="w-[50px] text-left">학년</p>
          <IDButton
            :text="'1학년'"
            :isWhite="gradeValue.includes('GRADE01') ? false : true"
            :_width="70"
            @onClick="() => changeGrade('GRADE01')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
          <IDButton
            :text="'2학년'"
            :isWhite="gradeValue.includes('GRADE02') ? false : true"
            :_width="70"
            @onClick="() => changeGrade('GRADE02')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
          <IDButton
            :text="'3학년'"
            :isWhite="gradeValue.includes('GRADE03') ? false : true"
            :_width="70"
            @onClick="() => changeGrade('GRADE03')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
          <IDButton
            v-if="schValue === 'SCH_02'"
            :text="'4학년'"
            :isWhite="gradeValue.includes('GRADE04') ? false : true"
            :_width="70"
            @onClick="() => changeGrade('GRADE04')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
          <IDButton
            v-if="schValue === 'SCH_02'"
            :text="'5학년'"
            :isWhite="gradeValue.includes('GRADE05') ? false : true"
            :_width="70"
            @onClick="() => changeGrade('GRADE05')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
          <IDButton
            v-if="schValue === 'SCH_02'"
            :text="'6학년'"
            :isWhite="gradeValue.includes('GRADE06') ? false : true"
            :_width="70"
            @onClick="() => changeGrade('GRADE06')"
            class="hover:bg-[#2F80ED] hover:text-white text-black"
          />
        </div>
      </div>
    </div>
    <div
      class="flex text-sm justify-center mt-[10px]"
      v-if="isChooseSchool === '1'"
    >
      <IDButton
        :text="'추가'"
        :_width="150"
        isGray="true"
        @click="startAddTarget"
        class="bg-gray-300 text-white"
      />
    </div>
    <p class="text-base text-left font-semibold">목록</p>
    <div
      class="w-full bg-gray-100 min-h-[200px] rounded-md flex p-[10px] pt-[20px] gap-[10px] flex-wrap"
    >
      <div v-for="v in pollTarget" :key="`${v.text}pollTarget`">
        <IDButton
          v-if="v"
          :text="v.text"
          :_width="150"
          :isEllipsis="true"
          :isWhite="true"
          @onClick="() => delTarget(v.code)"
          class="h-[40px] text-black btn-selected"
        />
      </div>
    </div>

    <div class="flex text-sm justify-center mt-[10px]">
      <IDButton :text="'저장'" :_width="150" @click="submit" />
    </div>

    <div
      v-if="isShow2"
      class="content-center p-8 z-50 bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2 flex flex-col gap-[10px] min-w-[500px]"
      style="transform: translate(-50%, -50%)"
    >
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold">학교검색</p>
        <button class="text-2xl font-bold" @click="toggleSubPopup">x</button>
      </div>
      <IDSearch
        class="w-full"
        v-model="searchText"
        @keyup.enter="searchSch"
        :placeholder="'학교명을 입력해주세요.'"
      />
      <div class="flex items-center gap-[20px]">
        <AppDropdown
          :objectOptions="options1"
          :startText="selectedOption1"
          :openFull="true"
          @update:selectedOption="handleSelection1"
        />
        <AppDropdown
          :options="options2"
          :startText="selectedOption2"
          :openFull="true"
          @update:selectedOption="handleSelection2"
        />
      </div>
      <div class="w-full flex flex-col gap-[10px] h-[250px] overflow-auto">
        <div
          v-for="(v, i) in schList"
          :key="`${v.schulCode}`"
          :class="
            i === clickedSch
              ? 'w-full bg-[#2F80ED] text-white rounded-md flex p-[10px] gap-[5px] flex-wrap flex-col cursor-pointer'
              : 'w-full bg-gray-100 rounded-md flex p-[10px] gap-[5px] flex-wrap flex-col cursor-pointer'
          "
          @click="() => clickSchList(i)"
        >
          <p class="text-base text-left font-semibold">{{ v.schulNm }}</p>
          <p
            class="text-xs text-left"
            :class="i === clickedSch ? 'text-white' : 'text-gray-500'"
          >
            {{ v.regionDetail }}
          </p>
          <div class="w-full flex gap-[10px] mt-[10px]" v-if="i === clickedSch">
            <div class="w-[35px]">
              <p class="text-sm text-left font-semibold">학년</p>
            </div>
            <div class="flex gap-[10px] flex-wrap items-center">
              <div>
                <IDButton
                  :text="'1학년'"
                  :_width="60"
                  :isWhite="true"
                  @click.stop="() => changeGrade('GRADE01')"
                  class="h-[30px] text-black text-xs"
                  :class="
                    gradeValue.includes('GRADE01')
                      ? 'border-[#F8B200] border-2'
                      : ''
                  "
                />
              </div>
              <div>
                <IDButton
                  :text="'2학년'"
                  :_width="60"
                  :isWhite="true"
                  @click.stop="() => changeGrade('GRADE02')"
                  class="h-[30px] text-black text-xs"
                  :class="
                    gradeValue.includes('GRADE02')
                      ? 'border-[#F8B200] border-2'
                      : ''
                  "
                />
              </div>
              <div>
                <IDButton
                  :text="'3학년'"
                  :_width="60"
                  :isWhite="true"
                  @click.stop="() => changeGrade('GRADE03')"
                  class="h-[30px] text-black text-xs"
                  :class="
                    gradeValue.includes('GRADE03')
                      ? 'border-[#F8B200] border-2'
                      : ''
                  "
                />
              </div>
              <div v-if="v.schulGradeCode === 'SCH_02'">
                <IDButton
                  :text="'4학년'"
                  :_width="60"
                  :isWhite="true"
                  @click.stop="() => changeGrade('GRADE04')"
                  class="h-[30px] text-black text-xs"
                  :class="
                    gradeValue.includes('GRADE04')
                      ? 'border-[#F8B200] border-2'
                      : ''
                  "
                />
              </div>
              <div v-if="v.schulGradeCode === 'SCH_02'">
                <IDButton
                  :text="'5학년'"
                  :_width="60"
                  :isWhite="true"
                  @click.stop="() => changeGrade('GRADE05')"
                  class="h-[30px] text-black text-xs"
                  :class="
                    gradeValue.includes('GRADE05')
                      ? 'border-[#F8B200] border-2'
                      : ''
                  "
                />
              </div>
              <div v-if="v.schulGradeCode === 'SCH_02'">
                <IDButton
                  :text="'6학년'"
                  :_width="60"
                  :isWhite="true"
                  @click.stop="() => changeGrade('GRADE06')"
                  class="h-[30px] text-black text-xs"
                  :class="
                    gradeValue.includes('GRADE06')
                      ? 'border-[#F8B200] border-2'
                      : ''
                  "
                />
              </div>
            </div>
          </div>
          <div class="mt-[10px]" v-if="i === clickedSch">
            <IDButton
              :text="'추가'"
              :_width="60"
              class="h-[30px] border border-gray-400 bg-gray-400 text-xs"
              @click.stop="startAddTarget2"
            />
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
      default: false,
    },
    metadata: {
      type: Object,
    },
  },
  components: {
    IDButton,
    IDSearch,
    AppDropdown,
  },
  setup(props, { emit }) {
    const gradeDic = {
      GRADE01: '1학년',
      GRADE02: '2학년',
      GRADE03: '3학년',
      GRADE04: '4학년',
      GRADE05: '5학년',
      GRADE06: '6학년',
    };
    const schDic = {
      SCH_02: '초등학교',
      SCH_03: '중학교',
      SCH_04: '고등학교',
    };

    const route = useRoute();
    const router = useRouter();
    const IDStore = useIDStore();
    const stateStore = useStateStore();
    const info = computed(() => {
      return props.metadata;
    });

    const schValue = ref('SCH_02');
    const gradeValue = ref([]);
    const pollId = ref('');
    const pollTarget = ref({});
    const title = ref('');
    const isChooseSchool = ref('1');
    const isShow1 = ref(props.isShow);
    const isShow2 = ref(false);
    const options1 = ref([
      {
        name: '학교급',
        value: 'all',
      },
      {
        name: '초등학교',
        value: 'SCH_02',
      },
      {
        name: '중학교',
        value: 'SCH_03',
      },
      {
        name: '고등학교',
        value: 'SCH_04',
      },
    ]);
    const options2 = ref(['오름차순', '내림차순']);
    const selectedOption1 = ref('학교급');
    const selectedOption2 = ref('오름차순');
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    const isWork = computed(() => {
      return stateStore.popupFlag;
    });
    const originSchList = ref([]);
    const schList = ref([]);
    const searchText = ref();
    const searchTextComplete = ref();
    const searchSchGradeComplete = ref();
    const clickedSch = ref();

    const handleSelection1 = (v) => {
      gradeValue.value = [];
      searchSchGradeComplete.value = v;
      sortSchList();
    };

    const handleSelection2 = (v) => {
      selectedOption2.value = v;
      sortSchList();
    };

    watch(
      () => info.value,
      (newVal) => {
        console.log('newVal');
        console.log(newVal);
        title.value = newVal.pollNm;
        startDate.value = new Date(toDateFormat(newVal.pollBgnde));
        endDate.value = new Date(toDateFormat(newVal.pollEndde));
        pollId.value = newVal.pollId;
        let tmpObj = {};
        for (let i in newVal.pollTarget) {
          const key = newVal.pollTargetCode[i];
          let valTmp = newVal.pollTarget[i].split('__');
          if (valTmp[0] === 'null') valTmp.splice(0, 1);
          const val = valTmp.join('-');
          tmpObj[key] = {
            text: val,
            code: key,
          };
        }
        pollTarget.value = tmpObj;
      }
    );

    watch(
      () => isWork.value,
      (popupFlag) => {
        togglePopup(popupFlag);
      }
    );

    const toDateFormat = (d) => {
      let year = d.slice(0, 4);
      let month = d.slice(4, 6);
      let day = d.slice(6, 8);

      return `${year}-${month}-${day}`;
    };

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

    const toggleSubPopup = async () => {
      if (!isShow2.value) {
        const schInfoResponse = await IDService.getSchulInfo();

        const resData = schInfoResponse.data;

        if (resData.error) {
          alert(resData.error);
          return;
        }
        console.log(resData);
        originSchList.value = resData.data;
        sortSchList();
      }
      isShow2.value = !isShow2.value;
    };

    const submit = async () => {
      const targetAry = [];
      for (let k in pollTarget.value) {
        targetAry.push(pollTarget.value[k].code);
      }
      if (!targetAry.length) {
        alert('목록에 대상을 추가해주세요.');
        return;
      }
      const pollBgnde = parseDate(startDate.value);
      const pollEndde = parseDate(endDate.value);
      const res = await IDService.updateReports(pollId.value, {
        pollTarget: targetAry.join(','),
        pollBgnde,
        pollEndde,
      });
      console.log(res.data);
      alert('저장되었습니다.');
      location.reload(true);
    };

    const parseDate = (d) => {
      const tmp = new Date(d);
      let year = tmp.getFullYear();
      let month = tmp.getMonth() + 1;
      let day = tmp.getDate();
      month = String(month).padStart(2, '0');
      day = String(day).padStart(2, '0');
      return `${year}${month}${day}`;
    };

    const changeSch = (v) => {
      schValue.value = v;
    };

    const changeGrade = (v) => {
      if (gradeValue.value.includes(v)) {
        gradeValue.value = gradeValue.value.filter((item) => item !== v);
      } else {
        gradeValue.value.push(v);
      }
    };

    const startAddTarget = () => {
      const tmpGrade = gradeValue.value;
      const tmpSch = schValue.value;
      gradeValue.value = [];
      for (let i in tmpGrade) {
        addTarget(tmpSch, tmpGrade[i]);
      }
    };

    const addTarget = (sch, grade, school = 'null', school_code = 'null') => {
      const tmpObj = pollTarget.value;
      const target = `${school_code}__${sch}__${grade}`;
      const targetText =
        school === 'null'
          ? `${schDic[sch]}-${gradeDic[grade]}`
          : `${school}-${schDic[sch]}-${gradeDic[grade]}`;
      if (!pollTarget.value[target]) {
        tmpObj[target] = { code: target, text: targetText };
        pollTarget.value = tmpObj;
      }
    };

    const delTarget = (key) => {
      delete pollTarget.value[key];
    };

    const searchSch = () => {
      searchTextComplete.value = searchText.value;
      sortSchList();
    };

    const sortSchList = () => {
      console.log('start');
      let tmpList = originSchList.value;

      console.log(searchTextComplete.value);
      if (searchTextComplete.value) {
        tmpList = tmpList.filter((item) =>
          item.schulNm.includes(searchTextComplete.value)
        );
      }
      if (
        searchSchGradeComplete.value &&
        searchSchGradeComplete.value !== 'all'
      ) {
        tmpList = tmpList.filter(
          (item) => item.schulGradeCode === searchSchGradeComplete.value
        );
      }
      if (selectedOption2.value === '오름차순') {
        tmpList = [...tmpList].sort((a, b) =>
          a.schulNm.localeCompare(b.schulNm)
        );
      } else {
        tmpList = [...tmpList].sort((a, b) =>
          b.schulNm.localeCompare(a.schulNm)
        );
      }
      console.log('fin');

      schList.value = [];
      const chunkList = [];
      let max = tmpList.length;
      let cnt = 0;
      while (cnt <= max) {
        chunkList.push(tmpList.slice(cnt, cnt + 100));
        cnt += 100;
      }

      // 레이지로딩느낌?
      for (const i in chunkList) {
        setTimeout(() => {
          schList.value.push(...chunkList[i]);
        }, i * 1000);
      }
    };

    const clickSchList = (i) => {
      gradeValue.value = [];
      if (clickedSch.value === i) clickedSch.value = null;
      else clickedSch.value = i;
    };

    const startAddTarget2 = () => {
      const iStr = clickedSch.value.toString();
      if (!iStr || !gradeValue.value.length) return;
      const tmpGrade = gradeValue.value;
      const i = clickedSch.value;
      const currentSch = schList.value[i];
      const tmp1 = currentSch.schulGradeCode;
      const tmp2 = currentSch.schulNm;
      const tmp3 = currentSch.schulCode;

      gradeValue.value = [];
      for (let i in tmpGrade) {
        addTarget(tmp1, tmpGrade[i], tmp2, tmp3);
      }
    };

    return {
      title,
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
      isChooseSchool,
      schValue,
      gradeValue,
      pollTarget,
      searchText,
      schList,
      clickedSch,

      handleSelection1,
      handleSelection2,
      togglePopup,
      toggleSubPopup,
      changeGrade,
      changeSch,
      submit,
      startAddTarget,
      addTarget,
      delTarget,
      searchSch,
      clickSchList,
      startAddTarget2,
    };
  },
};
</script>

<style scoped>
.btn-selected::after {
  content: 'x';
  position: relative;
  bottom: 35px;
  left: 130px;
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
