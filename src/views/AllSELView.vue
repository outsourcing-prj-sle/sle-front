<template>
  <div class="flex flex-col bg-white">
    <div
      class="flex justify-start flex-col px-20 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <h1 class="text-xl text-left font-bold text-neutral-700">학생 SEL알기</h1>
      <h2 class="mt-2 text-left text-lg font-semibold text-neutral-700">학생들의 SEL 활동 참여 상태를 확인할 수 있습니다.</h2>
    </div>
    <section class="flex flex-col px-20 mt-5 w-full text-base max-md:px-5 max-md:max-w-full">
      <div class="w-full flex justify-start z-50">
        <AppDropdown 
          class="w-full"
          :options="reportList" 
          :startText="selectedReport"
          :openWay="'left'"
          :openFull="true"
          @update:selectedOption="handleReportSelection"
        />
      </div>
      <div
        class="mt-2.5 text-base text-left font-semibold max-md:max-w-full"
        v-if="reportMetadata[selectedReport]"
      >
          <span class="font-medium">활동 기간 : {{reportMetadata[selectedReport].dateRange}} (</span>
          <span 
            class="font-medium text-blue-500"
            :class="{
              'text-red-600': !reportMetadata[selectedReport].state
            }"
          >
            {{reportMetadata[selectedReport].state ? '진행중' : '미진행중'}}
          </span>
          <span class="font-medium">)</span>
      </div>
      <div class="w-full flex justify-between items-center mt-2">
        <div class="flex gap-4">
          <AppDropdown 
            :openWay="'left'"
            :openFull="true"
            :options="options" 
            :startText="selectedOption"
            @update:selectedOption="handleSelection" 
          />
          <label class="flex gap-2.5 my-auto text-base font text-neutral-700"  v-if="selectedReport !== '전체'">
            <input type="checkbox" class="shrink-0 w-6 h-6 bg-white border border-solid border-neutral-400"  v-model="showOnlyNon"/>
            <span class="flex-auto my-auto">미참여 학생만 보기</span>
          </label>
        </div>
        <div class="text-blue-500 cursor-pointer" @click="downloadExcel">
          <img class="h-[38px]" src="../assets/img/btn_excel_download.png" alt="엑셀_다운로드">
        </div>
      </div>
    <div
      class="mt-4 w-full overflow-x-scroll"
      v-if="infoArr.length"
    >
      <div class="w-full">
        <table
          class="table-auto border-collapse w-full"
          style="white-space: nowrap"
        >
          <thead>
            <tr
              class="mt-5 font-semibold text-cyan-900"
            >
              <th class="p-2 bg-blue-100 max-md:px-5">번호</th>
              <th
                class="p-2 bg-blue-100 max-md:px-5"
                v-for="(title, i) in titleArr"
                :key="`${title}${i}`"
              >{{title}}</th>
            </tr>
          </thead>
          <tbody class="" v-if="selectedReport !== '전체'">
            <template 
              v-for="(info, i) in infoArr"
              :key="`${info.name}${i}`"
            >
            <tr
              class="w-full border-b border-solid border-stone-200"
              v-if="!showOnlyNon || (showOnlyNon && !info.stateList[selectedReport])"
            >
              <td class="my-auto text-neutral-700 px-2 py-2.5 w-[50px]">{{ i+1 }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.name }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.email }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.grade }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.gender }}</td>
              <td class="my-auto px-2"
                :class="{
                  'text-red-600': !info.stateList[selectedReport],
                  'text-zinc-800': info.stateList[selectedReport],
                }"
              >
                {{ info.stateList[selectedReport] ? '참여' : '미참여' }}
              </td>
            </tr>
            </template>
          </tbody>
          <tbody class="" v-else>
            <template 
              v-for="(info, i) in infoArr"
              :key="`${info.name}${i}`"
            >
            <tr
              class="w-full border-b border-solid border-stone-200"
            >
              <td class="my-auto text-neutral-700 px-2 py-2.5 w-[50px]">{{ i+1 }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.name }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.email }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.grade }}</td>
              <td class="my-auto text-zinc-800 px-2">{{ info.gender }}</td>
              <td
                class="my-auto px-2"
                v-for="(title) in titleReportArr"
                :key="`${title}${info.name}${i}`"
                :class="{
                  'text-red-600': !info.stateList[title],
                  'text-zinc-800': info.stateList[title],
                }"
              >
                {{ info.stateList[title] ? '참여' : '미참여' }}
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="mt-4 w-full overflow-x-scroll border border-current pb-4"
      v-else
    >
      설문이 없습니다.
    </div>

    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js'
import AppDropdown from '../components/AppDropdown.vue';
import UserService from '@/service/UserService';
import { _mixDate } from '@/utils/utils';

export default {
  components: {
    AppDropdown,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const userId = computed(() => userStore.id);
    const infoArr = ref([]);
    const titleArr = ref([]);
    const titleReportArr = ref([]);
    const showOnlyNon = ref(false);

    const reportList = ref(['전체']);
    const selectedReport = ref('전체');
    const reportMetadata = ref({});

    const options = ref(['마감순', '마감순 2', '마감순 3']);
    const selectedOption = ref('마감순');
    
    onMounted(() => {
      fetchReportList();
    });

    const handleSelection = (option) => {
      selectedOption.value = option;
    };

    const fetchReportList = async () => {
      const mySelReponse = await UserService.mysel({});
      const resData = mySelReponse.data;

      resData.reportList.map((item) => {
        const pollNm = item.pollNm;
        reportList.value.push(pollNm);
        titleReportArr.value.push(pollNm);

        reportMetadata.value[pollNm] = {
          dateRange: _mixDate(item.startDate, item.endDate) + '까지',
          state: item.expired === '0'
        };
      })

      resData.infoArr.map((item) => {
        const info = {
          name: item.name,
          email: item.email,
          grade: item.classInfo,
          gender: item.sex === 'M' ? '남' : '여',
          stateList: item.stateList,
        }

        infoArr.value.push(info);
      });
      
      setTitleList();
    }

    const setTitleList = () => {
      titleArr.value = ['이름', '계정', '학년-반', '성별'];
      if(selectedReport.value === '전체') {
        // todo : 이거 API 받는거대로 수정
        titleArr.value.push(...titleReportArr.value)
      }
      else {
        titleArr.value.push('상태')
      }
    }

    const handleReportSelection = (option) => {
      selectedReport.value = option;
      setTitleList()
    };

    const downloadExcel = () => {

      if (infoArr.value.length) {
          const aEl = document.createElement('a');

          let text = titleArr.value.join(',') + '\n';

          infoArr.value.forEach((info) => {
            text +=
              [info.name, info.email, info.grade, info.gender].join(',');
            if(selectedReport.value === '전체') {
              for(let i in titleReportArr.value) {
                text += info.stateList[titleReportArr.value[i]] ? ',참여' : ',미참여'
              }
            }
            else {
              text += info.stateList[selectedReport.value] ? ',참여' : ',미참여'
            }
            text += '\n';
          });

          aEl.setAttribute(
            'href',
            `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
          );

          aEl.setAttribute('download', `${new Date()}_SEL.csv`);

          aEl.style.display = 'none';
          document.body.appendChild(aEl);
          aEl.click();
          document.body.removeChild(aEl);
        } else {
          alert('데이터가 없습니다.');
        }
    }
    

    return {
      reportList,
      selectedReport,
      reportMetadata,
      infoArr,
      titleArr,
      titleReportArr,
      handleReportSelection,
      showOnlyNon,

      options,
      selectedOption,
      handleSelection,
      downloadExcel,
    };
  }
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
