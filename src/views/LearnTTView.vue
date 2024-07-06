<template>
  <div class="flex flex-col bg-white">
    <section
      class="flex gap-5 justify-between px-16 py-6 w-full text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
      style="background-color: #deebf7"
    >
      <div class="flex flex-col my-auto">
        <p class="mt-4 text-base font-medium text-left">
          <span class="font-bold text-xl">학습성향</span>은 학생 개개의 성격적
          특성에 따라 학습을 수행하는 태도, 습관 및 특징 등이 고려된 고유한
          개념입니다. 본 학습성향은 Big 5 성격이론 등을 기반으로 구성되었으며 각
          특성은 고유한 학습적 성향이고, 좋고 나쁨의 개념이 아닙니다. 학습성향에
          따라 학습적 성향의 특성과 지도 Tip를 제안하고 있으니 이를 참고하여
          주시기 바랍니다.
        </p>
      </div>
      <img
        src="@/assets/img/logo-idtt.png"
        alt="Logo"
        class="h-[240px] w-[332px]"
      />
    </section>
    <section
      class="flex flex-col px-20 mt-7 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <div>
        <apexchart
          width="380"
          type="donut"
          :options="donutChartOptions1"
          :series="donutChartSeries1"
        ></apexchart>
      </div>
    </section>
    <section
      class="flex flex-col px-20 mt-7 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <div class="w-[300px] flex justify-start">
        <AppDropdown
          v-if="selectedOption"
          :options="options"
          :startText="options[0]"
          :openWay="'left'"
          @update:selectedOption="handleSelection"
        />
      </div>
      <div class="mt-4 w-full text-left">
        <b class="text-xl">
          <span class="text-blue-500">{{ name }} 학생</span>의 학습성향 그래프
        </b>
        <div class="w-full text-center items-center flex justify-center"></div>
        <div>
          <apexchart
            width="500"
            type="bar"
            :options="barChartOptions"
            :series="barChartSeries"
          ></apexchart>
        </div>
        <b class="text-xl my-[20px]">*성향별 상세 안내</b>
        <div class="mb-[40px]">
          <p class="my-[10px] font-medium text-xl">
            학습 콘텐츠를 건너뛰며 점검하는 성향
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              이 학생들은 학습 활동의 순서에 얽매이지 않고 스스로 자유롭게
              학습하고자 하는 성향입니다 이 유형이 높을수록 학습내용을 대충
              넘기거나 훑어보기 때문에 학습을 건너뛰거나 요점을 파악하는데
              어려움이 있을 수 있습니다. 스스로 흥미가 있는 분야에서는 집중력
              있게 높은 수행을 보일 수도 있습니다. 학생이 흥미가 있는 영역부터
              단계적으로 학습할 수 있도록 도와주세요.
            </p>
          </div>
        </div>
        <div class="mb-[40px]">
          <p class="my-[10px] font-medium text-xl">
            신속하게 과제를 수행하는 성향
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              이 학생들은 자신이 계획한 목표를 실행하기 위해서 과제의 제출
              마감시간을 잘 지키고 신속하게 학업을 수행하려고 하는 성향입니다.
              이 유형이 높을수록 목표지향적이고 학습 효율이 높을 수 있으나 너무
              급하게 학업을 진행하여서 학업 완성도가 낮아질 수 있습니다. 학업을
              수행할 때 학습진도나 학습 목차를 찬찬히 살펴보고 단계적 계획을
              실천할 수 있도록 도와주세요. 또한, 스스로 생각하는 시간을 충분히
              가지도록 돕는 것도 좋은 방법입니다.
            </p>
          </div>
        </div>
        <div class="mb-[40px]">
          <p class="my-[10px] font-medium text-xl">독립적으로 학습하는 성향</p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              이 학생들은 혼자 학습하는 것을 선호하는 성향입니다. 이 유형이
              높을수록 타인의 시선을 의식하지 않고 자기 주도적이며 독립적 학습이
              가능한 반면 협동과제나 그룹활동에서는 어려움을 경험할 수 있습니다.
              이야기방 활동이나 톡톡 AI도움쌤 등의 기능을 적극적으로 활용하여
              소통적 참여를 할 수 있도록 도와주세요.
            </p>
          </div>
        </div>
        <div>
          <p>
            <span class="text-blue-500 font-medium">{{ name }} 학생</span>의
            학습성향 AI분석 의견조사
          </p>
          <div class="my-[20px]">
            <p>
              Q1. AI가 진단한 피드백 내용과 오프라인에서 살펴본 학생에 대한
              선생님의 의견이 얼마나 일치하였나요?*
            </p>
            <div class="flex gap-[20px] p-[20px]">
              <div class="flex gap-[10px]">
                <input
                  type="radio"
                  id="question01_1"
                  name="question01"
                  v-model="qesAnswer1"
                  value="1"
                  required
                />
                <label for="question01_1" class="pr-[50px] cursor-pointer">
                  <img
                    class="w-[170px] h-[32px]"
                    src="@/assets/img/idtt-star-1.png"
                    alt="star1"
                  />
                </label>
              </div>
              <div class="flex gap-[10px]">
                <input
                  type="radio"
                  id="question01_2"
                  name="question01"
                  v-model="qesAnswer1"
                  value="2"
                  required
                />
                <label for="question01_2" class="pr-[50px] cursor-pointer">
                  <img
                    class="w-[170px] h-[32px]"
                    src="@/assets/img/idtt-star-2.png"
                    alt="star1"
                  />
                </label>
              </div>
              <div class="flex gap-[10px]">
                <input
                  type="radio"
                  id="question01_3"
                  name="question01"
                  v-model="qesAnswer1"
                  value="3"
                  required
                />
                <label for="question01_3" class="pr-[50px] cursor-pointer">
                  <img
                    class="w-[170px] h-[32px]"
                    src="@/assets/img/idtt-star-3.png"
                    alt="star1"
                  />
                </label>
              </div>
            </div>
            <div class="my-[20px]">
              <p>
                Q2. 일치하지 않는다면 어느 유형이 일치하지 않았나요?* (중복선택
                가능)
              </p>
              <div class="flex flex-col gap-[20px] p-[20px]">
                <div>
                  <input
                    type="checkbox"
                    id="question02_1"
                    name="question02"
                    v-model="qesAnswer2"
                    value="1"
                    required
                  />
                  <label for="question02_1" class="pr-[50px] cursor-pointer">
                    학습 콘텐츠를 자주 보고 점검하는 성향/학습 콘텐츠를 건너뛰며
                    점검하는 성향
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="question02_2"
                    name="question02"
                    v-model="qesAnswer2"
                    value="2"
                    required
                  />
                  <label for="question02_2" class="pr-[50px] cursor-pointer">
                    신속하게 과제를 수행하는 성향/느긋하게 과제를 수행하는 성향
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="question02_3"
                    name="question02"
                    v-model="qesAnswer2"
                    value="3"
                    required
                  />
                  <label for="question02_3" class="pr-[50px] cursor-pointer">
                    소통을 활발하게 하며 학습하는 성향/독립적으로 학습하는 성향
                  </label>
                </div>
              </div>
            </div>
            <div class="mt-[20px]">
              <p>Q3. 개선의견을 자유롭게 적어주세요(선택)</p>
              <textarea
                class="w-full border border-gray-300 px-[20px] py-[10px] mt-[20px] h-[136px]"
                name="question03"
                id="question03"
                v-model="qesAnswer3"
                required
              ></textarea>
            </div>
          </div>
          <section class="flex justify-center items-center py-5">
            <button
              class="px-12 py-4 text-base font-medium text-center text-white bg-blue-500 rounded-xl border border-blue-500 border-solid max-w-[191px]"
              tabindex="0"
              @click="submitInfo"
            >
              의견 제출
            </button>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '@/service/UserService.js';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  components: {
    AppDropdown,
  },
  setup() {
    const router = useRouter();
    const infoArr = ref([]);
    const optionsObj = ref({});
    const name = ref('');

    const options = ref([
      '홍길동(dlwkr01@gne.go.kr)',
      '홍길동(dlwkr01@gne.go.kr)',
      '홍길동(dlwkr01@gne.go.kr)',
    ]);
    const selectedOption = ref('');
    const qesAnswer1 = ref();
    const qesAnswer2 = ref([]);
    const qesAnswer3 = ref();
    const isOpen = ref([false, false, false, false]);
    const needReportAry = ref([]); // 설문 안한사람들 저장

    onMounted(async () => {
      await fetchData();
    });

    const needReport = computed(() => {
      return !needReportAry.value.includes(selectedOption.value);
    });

    // 학생 리스트
    const fetchData = async () => {
      const mySELResponse = await UserService.getMySEL();
      const resData = mySELResponse.data;

      // console.log(resData);

      if (resData.error) {
        alert(resData.error);
        return;
      }

      const infoArr = resData.infoArr;

      let tmpNeedReportAry = [];
      let tmpAry = [];
      let tmpObj = {};
      for (let i in infoArr) {
        let d = infoArr[i];
        let stateList = d.stateList;
        if (
          !stateList['마음알기 설문1'] ||
          !stateList['마음알기 설문2'] ||
          !stateList['마음알기 설문3']
        ) {
          tmpNeedReportAry.push(`${d.name}(${d.email})`);
        }

        tmpAry.push(`${d.name}(${d.email})`);
        tmpObj[`${d.name}(${d.email})`] = d;
      }
      options.value = tmpAry;
      optionsObj.value = tmpObj;
      needReportAry.value = tmpNeedReportAry;

      selectedOption.value = tmpAry[0];
      // console.log(selectedOption.value);
      // todo :selectopton.value[현재학생 `${d.name}(${d.email})`] 로 userId얻고 그거로 데이터 호출
    };

    const handleSelection = (option) => {
      selectedOption.value = option;
    };

    const submitInfo = async () => {
      if (!qesAnswer1.value) {
        alert('Q1번을 선택해주세요.');
        return;
      }

      if (!qesAnswer2.value.length) {
        alert('Q2번을 선택해주세요.');
        return;
      }

      if (!qesAnswer3.value) {
        alert('Q3번을 선택해주세요.');
        return;
      }

      const submitReponse = await UserService.insertReseachResult({
        id: optionsObj.value[selectedOption.value].userId,
        qesAnswer: `${qesAnswer1.value}/${qesAnswer2.value}/${qesAnswer3.value}`,
      });

      const resData = submitReponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      alert('설문이 저장되었습니다!');
    };

    const barChartSeries = ref([
      {
        name: 'Males',
        data: [
          0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2,
          4.5, 3.9, 3.5, 3,
        ],
      },
      {
        name: 'Females',
        data: [
          -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22,
          -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
        ],
      },
    ]);

    const barChartOptions = ref({
      chart: {
        type: 'bar',
        height: 440,
        stacked: true,
      },
      colors: ['#008FFB', '#FF4560'],
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: 'end', // 'around', 'end'
          borderRadiusWhenStacked: 'all', // 'all', 'last'
          horizontal: true,
          barHeight: '80%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },

      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        stepSize: 1,
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val) {
            return val;
          },
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + '%';
          },
        },
      },
      title: {
        text: 'Mauritius population pyramid 2011',
      },
      xaxis: {
        categories: [
          '85+',
          '80-84',
          '75-79',
          '70-74',
          '65-69',
          '60-64',
          '55-59',
          '50-54',
          '45-49',
          '40-44',
          '35-39',
          '30-34',
          '25-29',
          '20-24',
          '15-19',
          '10-14',
          '5-9',
          '0-4',
        ],
        title: {
          text: 'Percent',
        },
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + '%';
          },
        },
      },
    });

    const donutChartOptions1 = ref({});
    const donutChartSeries1 = ref([44, 55, 41, 17, 15]);

    const donutChartOptions2 = ref({});
    const donutChartSeries2 = ref([44, 55, 41, 17, 15]);

    const donutChartOptions3 = ref({});
    const donutChartSeries3 = ref([44, 55, 41, 17, 15]);

    return {
      qesAnswer1,
      qesAnswer2,
      qesAnswer3,
      options,
      selectedOption,
      infoArr,
      name,
      isOpen,
      needReport,
      barChartSeries,
      barChartOptions,
      donutChartOptions1,
      donutChartSeries1,
      donutChartOptions2,
      donutChartSeries2,
      donutChartOptions3,
      donutChartSeries3,

      handleSelection,
      submitInfo,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
