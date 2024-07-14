<template>
  <div class="flex flex-col bg-white">
    <section
      class="flex gap-5 justify-between px-16 py-6 w-full text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
      style="background-color: #deebf7"
    >
      <div class="flex flex-col my-auto">
        <p class="mt-4 text-base font-medium text-left" v-html="learnTitle"></p>
      </div>
      <img
        src="@/assets/img/logo-idtt.png"
        alt="Logo"
        class="h-[240px] w-[332px]"
      />
    </section>
    <section
      v-if="!isChartData"
      class="flex flex-col px-20 mt-7 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <b class="text-xl text-left">
        <span class="text-blue-500">{{ $t('learn.class') }}</span>
        {{ $t('learn.learn_tt') }}
      </b>
      <div
        class="flex flex-col flex-1 justify-center text-center items-center mt-20"
      >
        <img
          class="w-[181px] h-[181px]"
          src="@/assets/img/no_data.png"
          alt="no_data"
        />
        <span class="mt-20">{{ $t('learn.no_data_class') }}</span>
      </div>
    </section>
    <section
      v-if="isChartData"
      class="flex flex-col px-20 mt-7 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <!-- <div class="w-[300px] flex justify-start my-[20px] z-50">
        <AppDropdown
          v-if="options2.length"
          :objectOptions="options2"
          :startText="options2[0]"
          :openWay="'left'"
          @update:selectedOption="handleSelection2"
        />
      </div> -->
      <b class="text-xl text-left">
        <span class="text-blue-500">{{ $t('learn.class') }}</span>
        {{ $t('learn.learn_tt') }}
      </b>
      <div class="flex justify-between flex-wrap">
        <div class="flex flex-col w-[300px] mt-[10px]">
          <apexchart
            width="300"
            type="donut"
            :options="donutChartOptions1"
            :series="donutChartSeries1"
          ></apexchart>
          <div class="flex items-start">
            <picture>
              <img
                class="w-[100px]"
                src="@/assets/img/ico-lt-robot.svg"
                alt=""
              />
            </picture>
            <p
              v-if="donutChartSeries1[0] > donutChartSeries1[1]"
              class="text-left text-sm"
            >
              {{ $t('learn.donut_chart_series1_1') }}
            </p>
            <p
              v-if="donutChartSeries1[0] < donutChartSeries1[1]"
              class="text-left text-sm"
            >
              {{ $t('learn.donut_chart_series1_2') }}
            </p>
          </div>
        </div>
        <div class="flex flex-col w-[300px] mt-[10px]">
          <apexchart
            width="300"
            type="donut"
            :options="donutChartOptions2"
            :series="donutChartSeries2"
          ></apexchart>
          <div class="flex items-start">
            <picture>
              <img
                class="w-[100px]"
                src="@/assets/img/ico-lt-robot.svg"
                alt=""
              />
            </picture>
            <p
              v-if="donutChartSeries2[0] > donutChartSeries2[1]"
              class="text-left text-sm"
            >
              {{ $t('learn.donut_chart_series2_1') }}
            </p>
            <p
              v-if="donutChartSeries2[0] < donutChartSeries2[1]"
              class="text-left text-sm"
            >
              {{ $t('learn.donut_chart_series2_2') }}
            </p>
          </div>
        </div>
        <div class="flex flex-col w-[300px] mt-[10px]">
          <apexchart
            width="300"
            type="donut"
            :options="donutChartOptions3"
            :series="donutChartSeries3"
          ></apexchart>
          <div class="flex items-start">
            <picture>
              <img
                class="w-[100px]"
                src="@/assets/img/ico-lt-robot.svg"
                alt=""
              />
            </picture>
            <p
              v-if="donutChartSeries3[0] > donutChartSeries3[1]"
              class="text-left text-sm"
            >
              {{ $t('learn.donut_chart_series3_1') }}
            </p>
            <p
              v-if="donutChartSeries3[0] < donutChartSeries3[1]"
              class="text-left text-sm"
            >
              {{ $t('learn.donut_chart_series3_2') }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="!isChartData"
      class="flex flex-col px-20 mt-7 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <div class="w-[300px] flex justify-start z-50 my-4">
        <AppDropdown
          v-if="selectedOption"
          :options="options"
          :startText="options[0]"
          :openWay="'left'"
          @update:selectedOption="handleSelection"
        />
      </div>
      <b class="text-xl text-left" v-html="learnGraphTitle"> </b>
      <div
        class="flex flex-col flex-1 justify-center text-center items-center mt-20"
      >
        <img
          class="w-[181px] h-[181px]"
          src="@/assets/img/no_data.png"
          alt="no_data"
        />
        <span class="mt-20">{{ $t('learn.no_data_class') }}</span>
      </div>
    </section>
    <section
      v-if="isChartData"
      class="flex flex-col px-20 mt-20 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <div class="w-[300px] flex justify-start z-50">
        <AppDropdown
          v-if="selectedOption"
          :options="options"
          :startText="options[0]"
          :openWay="'left'"
          @update:selectedOption="handleSelection"
        />
      </div>
      <div class="mt-4 w-full text-left">
        <b class="text-xl text-left" v-html="learnGraphTitle"> </b>
        <div
          class="flex justify-center items-center border border-gray-300 p-[20px] mt-[20px] gap-[10px] mb-[60px]"
        >
          <div
            class="flex flex-col min-w-[150px] w-[150px] h-[200px] text-sm font-bold justify-between max-[1000px]:h-[150px] max-[900px]:h-[120px] max-[900px]:text-xs max-[900px]:w-[100px] max-[900px]:min-w-0 max-[600px]:hidden"
          >
            <p>{{ donutChartDataNmArr1[0] }}</p>
            <p>{{ donutChartDataNmArr2[0] }}</p>
            <p>{{ donutChartDataNmArr3[0] }}</p>
          </div>
          <apexchart
            width="500"
            type="bar"
            :options="barChartOptions"
            :series="barChartSeries"
          ></apexchart>
          <div
            class="flex flex-col min-w-[150px] w-[150px] h-[200px] text-sm font-bold justify-between max-[1000px]:h-[150px] max-[900px]:h-[120px] max-[900px]:text-xs max-[900px]:w-[100px] max-[900px]:min-w-0 max-[600px]:hidden"
          >
            <p>{{ donutChartDataNmArr1[1] }}</p>
            <p>{{ donutChartDataNmArr2[1] }}</p>
            <p>{{ donutChartDataNmArr3[1] }}</p>
          </div>
        </div>
        <b class="text-xl my-[20px]">*{{ $t('learn.detail_notice') }}</b>
        <div
          v-if="barChartDataArr1[0] > Math.abs(barChartDataArr2[0])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr1[0] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              {{ $t('learn.detail_1') }}
            </p>
          </div>
        </div>
        <div
          v-if="barChartDataArr1[0] < Math.abs(barChartDataArr2[0])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr1[1] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              {{ $t('learn.detail_2') }}
            </p>
          </div>
        </div>
        <div
          v-if="barChartDataArr1[1] > Math.abs(barChartDataArr2[1])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr2[0] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              {{ $t('learn.detail_3') }}
            </p>
          </div>
        </div>
        <div
          v-if="barChartDataArr1[1] < Math.abs(barChartDataArr2[1])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr2[1] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              {{ $t('learn.detail_4') }}
            </p>
          </div>
        </div>
        <div
          v-if="barChartDataArr1[2] > Math.abs(barChartDataArr2[2])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr3[0] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              {{ $t('learn.detail_5') }}
            </p>
          </div>
        </div>
        <div
          v-if="barChartDataArr1[2] < Math.abs(barChartDataArr2[2])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr3[1] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              {{ $t('learn.detail_6') }}
            </p>
          </div>
        </div>
        <div class="mt-[60px]">
          <p v-html="aiTitle"></p>
          <div class="my-[20px]">
            <p>Q1. {{ $t('learn.ai_q1') }}*</p>
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
              <p>Q2. {{ $t('learn.ai_q2') }}</p>
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
                    {{ $t('learn.ai_q2_1') }}
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
                    {{ $t('learn.ai_q2_2') }}
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
                    {{ $t('learn.ai_q2_3') }}
                  </label>
                </div>
              </div>
            </div>
            <div class="mt-[20px]">
              <p>Q3. {{ $t('learn.ai_q3') }}</p>
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
              {{ $t('learn.submit') }}
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
import { useI18n } from 'vue-i18n';

export default {
  components: {
    AppDropdown,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const isChartData = ref(true);
    const infoArr = ref([]);
    const optionsObj = ref({});
    const optionsObj2 = ref({});
    const name = ref('');

    const options = ref([
      '홍길동(dlwkr01@gne.go.kr)',
      '홍길동(dlwkr01@gne.go.kr)',
      '홍길동(dlwkr01@gne.go.kr)',
    ]);
    const selectedOption = ref('');
    const options2 = ref([]);
    const selectedOption2 = ref('');
    const qesAnswer1 = ref();
    const qesAnswer2 = ref([]);
    const qesAnswer3 = ref();
    const isOpen = ref([false, false, false, false]);
    const needReportAry = ref([]); // 설문 안한사람들 저장

    const barChartDataArr1 = ref([]);
    const barChartDataArr2 = ref([]);
    const barChartColor = ref(['#A46DF1', '#FF80BD', '#2584FF']);

    const donutChartDataNmArr1 = ref([
      t(`learn.donut_chart_data_1_1`),
      t(`learn.donut_chart_data_1_2`),
    ]);
    const donutChartDataNmArr2 = ref([
      t(`learn.donut_chart_data_2_1`),
      t(`learn.donut_chart_data_2_2`),
    ]);
    const donutChartDataNmArr3 = ref([
      t(`learn.donut_chart_data_3_1`),
      t(`learn.donut_chart_data_3_2`),
    ]);
    const donutChartColor1 = ref(['#E3ACD0', '#72AFE7']);
    const donutChartColor2 = ref(['#E3ACD0', '#72AFE7']);
    const donutChartColor3 = ref(['#E3ACD0', '#72AFE7']);
    const donutChartSeries1 = ref([80, 100]);
    const donutChartSeries2 = ref([20, 10]);
    const donutChartSeries3 = ref([20, 10]);

    const lang = computed(() => {
      return t('common.lang');
    });

    const aiTitle = computed(() => {
      return t('learn.ai_title').replace(
        '__name__',
        `<span class="text-blue-500 font-medium">${name.value} 학생</span>`
      );
    });

    const learnTitle = computed(() => {
      const typeHTML = `<span class="font-bold text-xl">${t('learn.learn_tt')}</span>`;
      return t('learn.learn_tt_detail').replace('__type__', typeHTML);
    });

    const learnGraphTitle = computed(() => {
      return t('learn.learn_tt_graph').replace(
        '__student__',
        `<span class="text-blue-500">${name.value} ${t('common.student')}</span>`
      );
    });

    watch(lang, (newValue, oldValue) => {
      donutChartDataNmArr1.value = [
        t(`learn.donut_chart_data_1_1`),
        t(`learn.donut_chart_data_1_2`),
      ];
      donutChartDataNmArr2.value = [
        t(`learn.donut_chart_data_2_1`),
        t(`learn.donut_chart_data_2_2`),
      ];
      donutChartDataNmArr3.value = [
        t(`learn.donut_chart_data_3_1`),
        t(`learn.donut_chart_data_3_2`),
      ];
    });

    onMounted(async () => {
      initClass();
      await fetchData();
      await fetchChartData();
    });

    const needReport = computed(() => {
      return !needReportAry.value.includes(selectedOption.value);
    });

    const initClass = async () => {
      const teacherResponse = await UserService.teacherIdtt();
      const resData = teacherResponse.data;

      console.log(resData);

      if (resData.error) {
        alert(resData.error);
        return;
      }

      // todo :: 학급 드롭박스 추가 할 정보
      // 선생님들 리스트 보고 있는 클래스로 드롭박스 생성
      // 드롭박스 선택하면 아래 동작
      // 해당 학급 학생 다시 부르기
      // 차트 다시 부르기
    };

    // 학생 리스트
    const fetchData = async () => {
      const mySELResponse = await UserService.getMySEL();
      const resData = mySELResponse.data;

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

      name.value = optionsObj.value[selectedOption.value].name;
      // console.log(selectedOption.value);
      // todo :selectopton.value[현재학생 `${d.name}(${d.email})`] 로 userId얻고 그거로 데이터 호출
    };

    const handleSelection = (option) => {
      selectedOption.value = option;

      name.value = optionsObj.value[option].name;
      fetchChartData(
        optionsObj.value[option].userId === null
          ? 'test'
          : optionsObj.value[option].userId
      );
    };

    const handleSelection2 = (option) => {
      selectedOption2.value = option;
      fetchData();
      fetchChartData();
    };

    const submitInfo = async () => {
      if (!qesAnswer1.value) {
        alert(t('learn.choose_alert').split('__num__', 1));
        return;
      }

      if (!qesAnswer2.value.length) {
        alert(t('learn.choose_alert').split('__num__', 2));
        return;
      }

      if (!qesAnswer3.value) {
        alert(t('learn.choose_alert').split('__num__', 3));
        return;
      }

      const submitReponse = await UserService.insertReseachResult({
        id: optionsObj.value[selectedOption.value].userId,
        qesAnswer: `${qesAnswer1.value}/${qesAnswer2.value}/${qesAnswer3.value}`,
        qesType: 'LT',
      });

      const resData = submitReponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      alert(t('learn.ai_res'));
    };

    const barChartSeries = computed(() => [
      {
        name: '1',
        data: barChartDataArr1.value,
      },
      {
        name: '2',
        data: barChartDataArr2.value,
      },
    ]);

    const barChartOptions = ref({
      chart: {
        horizontal: true,
        stacked: true,
      },
      colors: barChartColor.value,
      plotOptions: {
        bar: {
          distributed: true,
          borderRadiusApplication: 'end', // 'around', 'end'
          borderRadiusWhenStacked: 'all', // 'all', 'last'
          horizontal: true,
          borderRadius: 28,
          toolbar: {
            show: false,
          },
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            color: '#E0E0E0',
            strokeDashArray: 1,
            opacity: 0.5,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ['1', '2', '3'],
        labels: {
          show: false,
        },
        axisTicks: {
          show: true,
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              width: 400,
            },
            plotOptions: {
              bar: {
                borderRadius: 23,
              },
            },
          },
        },
        {
          breakpoint: 900,
          options: {
            chart: {
              width: 300,
            },
            plotOptions: {
              bar: {
                borderRadius: 15,
              },
            },
          },
        },
        {
          breakpoint: 800,
          options: {
            chart: {
              width: 250,
            },
            plotOptions: {
              bar: {
                borderRadius: 12,
              },
            },
          },
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 400,
            },
            plotOptions: {
              bar: {
                borderRadius: 25,
              },
            },
          },
        },
      ],
    });

    const donutChartOptions1 = computed(() => {
      return {
        chart: {
          type: 'donut',
        },
        colors: donutChartColor1.value,
        labels: donutChartDataNmArr1.value,
        plotOptions: {
          pie: {
            donut: {
              size: '50%',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return `${opts.w.config.series[opts.seriesIndex]}${t('common.person')}`;
          },
        },
        legend: {
          position: 'top',
        },
      };
    });

    const donutChartOptions2 = computed(() => {
      return {
        chart: {
          type: 'donut',
        },
        colors: donutChartColor2.value,
        labels: donutChartDataNmArr2.value,
        plotOptions: {
          pie: {
            donut: {
              size: '50%',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return `${opts.w.config.series[opts.seriesIndex]}${t('common.person')}`;
          },
        },
        legend: {
          position: 'top',
        },
      };
    });

    const donutChartOptions3 = computed(() => {
      return {
        chart: {
          type: 'donut',
        },
        colors: donutChartColor3.value,
        labels: donutChartDataNmArr3.value,
        plotOptions: {
          pie: {
            donut: {
              size: '50%',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return `${opts.w.config.series[opts.seriesIndex]}${t('common.person')}`;
          },
        },
        legend: {
          position: 'top',
        },
      };
    });

    const fetchChartData = async (userId = 'test') => {
      const response = await UserService.userIdttLT({ id: userId });
      const resData = response.data;

      console.log(resData);

      if (!resData.userPersonality) {
        isChartData.value = false;
        return;
      }

      if (!resData.classPersonality) {
        isChartData.value = false;
        return;
      }
      isChartData.value = true;

      let cArr1 = [];
      let cArr2 = [];
      let cArr3 = [];

      resData.classPersonality[0].type1.values.map((item) => {
        if (item) {
          cArr1.push(item);
        } else {
          cArr1.push(0);
        }
      });
      resData.classPersonality[0].type2.values.map((item) => {
        if (item) {
          cArr2.push(item);
        } else {
          cArr2.push(0);
        }
      });
      resData.classPersonality[0].type3.values.map((item) => {
        if (item) {
          cArr3.push(item);
        } else {
          cArr3.push(0);
        }
      });

      donutChartSeries1.value = cArr1;
      donutChartSeries2.value = cArr2;
      donutChartSeries3.value = cArr3;

      let uArr1 = [];
      let uArr2 = [];

      if (resData.userPersonality[0]['건너뛰며 점검하기']) {
        uArr1.push(parseInt(resData.userPersonality[0]['건너뛰며 점검하기']));
      } else {
        uArr1.push(0);
      }

      if (resData.userPersonality[0]['느긋하게 과제하기']) {
        uArr2.push(-parseInt(resData.userPersonality[0]['느긋하게 과제하기']));
      } else {
        uArr2.push(0);
      }

      if (resData.userPersonality[0]['신속하게 과제하기']) {
        uArr1.push(parseInt(resData.userPersonality[0]['신속하게 과제하기']));
      } else {
        uArr1.push(0);
      }

      if (resData.userPersonality[0]['건너뛰며 점검하기']) {
        uArr2.push(-parseInt(resData.userPersonality[0]['건너뛰며 점검하기']));
      } else {
        uArr2.push(0);
      }

      if (resData.userPersonality[0]['소통하며 학습하기']) {
        uArr1.push(parseInt(resData.userPersonality[0]['소통하며 학습하기']));
      } else {
        uArr1.push(0);
      }

      if (resData.userPersonality[0]['독립적으로 학습하기']) {
        uArr2.push(
          -parseInt(resData.userPersonality[0]['독립적으로 학습하기'])
        );
      } else {
        uArr2.push(0);
      }

      barChartDataArr1.value = uArr1;
      barChartDataArr2.value = uArr2;
    };

    return {
      isChartData,
      qesAnswer1,
      qesAnswer2,
      qesAnswer3,
      options,
      selectedOption,
      options2,
      selectedOption2,
      infoArr,
      name,
      isOpen,
      needReport,
      barChartSeries,
      barChartOptions,
      barChartDataArr1,
      barChartDataArr2,
      donutChartOptions1,
      donutChartSeries1,
      donutChartOptions2,
      donutChartSeries2,
      donutChartOptions3,
      donutChartSeries3,
      donutChartDataNmArr1,
      donutChartDataNmArr2,
      donutChartDataNmArr3,
      learnTitle,
      learnGraphTitle,
      aiTitle,

      handleSelection,
      handleSelection2,
      submitInfo,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
