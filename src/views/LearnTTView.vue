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
    <section v-if="!isChartData"
      class="flex flex-col px-20 mt-7 w-full text-base max-md:px-5 max-md:max-w-full"
    >
      <b class="text-xl text-left">
        <span class="text-blue-500">학급</span> 학습성향
      </b>
      <div
        class="flex flex-col flex-1 justify-center text-center items-center mt-20"
      >
        <img
          class="w-[181px] h-[181px]"
          src="@/assets/img/no_data.png"
          alt="no_data"
        />
        <span class="mt-20">조회된 학급에 대한 학급성향 데이터가 없습니다.</span>
      </div>
    </section>
    <section v-if="isChartData"
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
        <span class="text-blue-500">학급</span> 학습성향
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
              우리 학급은 학습내용을 자유롭게 건너뛰면서 학습하는 성향의
              아이들이 반복해서 과제를 확인하고 점검하는 성향의 아이들보다
              많습니다.
            </p>
            <p
              v-if="donutChartSeries1[0] < donutChartSeries1[1]"
              class="text-left text-sm"
            >
              우리 학급은 반복해서 과제를 확인하고 점검하는 성향의 아이들이
              학습내용을 자유롭게 건너뛰면서 학습하는 성향의 아이들보다
              많습니다.
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
              우리 학급은 학습 수행을 신속하게 하고 목표 지향적인 성향의
              아이들이 과제 마감기간에 유연함을 가지고 그 때 그때 수행하는
              성향의 아이들보다 많습니다.
            </p>
            <p
              v-if="donutChartSeries2[0] < donutChartSeries2[1]"
              class="text-left text-sm"
            >
              우리 학급은 과제 마감기간에 유연함을 가지고 그 때 그때 수행하는
              성향의 아이들이 학습 수행을 신속하게 하고 목표 지향적인 성향의
              아이들보다 많습니다.
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
              우리 학급은 선생님이나 또래와의 상호작용을 활발하게 하면서
              학습하는 성향의 아이들이 혼자 학습하는 것을 선호하는 성향의
              아이들보다 많습니다.
            </p>
            <p
              v-if="donutChartSeries3[0] < donutChartSeries3[1]"
              class="text-left text-sm"
            >
              우리 학급은 혼자 학습하는 것을 선호하는 성향의 아이들이 선생님이나
              또래와의 상호작용을 활발하게 하면서 학습하는 성향의 아이들보다
              많습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section v-if="!isChartData"
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
      <b class="text-xl text-left">
        <span class="text-blue-500">{{ name }} 학생</span>의 학습성향 그래프
      </b>
      <div
        class="flex flex-col flex-1 justify-center text-center items-center mt-20"
      >
        <img
          class="w-[181px] h-[181px]"
          src="@/assets/img/no_data.png"
          alt="no_data"
        />
        <span class="mt-20">조회된 학생에 대한 학습성향 데이터가 없습니다.</span>
      </div>
    </section>
    <section v-if="isChartData"
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
        <b class="text-xl">
          <span class="text-blue-500">{{ name }} 학생</span>의 학습성향 그래프
        </b>
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
        <b class="text-xl my-[20px]">*성향별 상세 안내</b>
        <div
          v-if="barChartDataArr1[0] > Math.abs(barChartDataArr2[0])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr1[0] }}
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
        <div
          v-if="barChartDataArr1[0] < Math.abs(barChartDataArr2[0])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr1[1] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              학습 콘텐츠를 자주 보고 점검하는 성향의 학생들은 반복해서 학습
              콘텐츠를 확인하거나 점검하고, 과제수정을 자주하는 성향입니다. 학습
              콘텐츠를 자주 보고 점검하는 성향이 높을수록완벽성과 안정성을
              추구하여 과제 수행 시간이 다른 사람들에 비해 오래 걸릴 수
              있습니다. 긴장을 많이 하는 학생일 수 있으므로 여유를 가질 수
              있도록 격려해주세요.
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
        <div
          v-if="barChartDataArr1[1] < Math.abs(barChartDataArr2[1])"
          class="mb-[40px]"
        >
          <p class="my-[10px] font-medium text-xl">
            {{ donutChartDataNmArr2[1] }}
          </p>
          <div class="p-[20px] border-gray-300 border-2 rounded-xl mb-[10px]">
            <p>
              느긋하게 과제를 수행하는 성향의 학생들은 마감시간에 대해 유연함을
              가지고 그때그때 수행하려고 하는 성향입니다. 느긋하게 과제를
              수행하는 성향이 높을수록 학업 수행 시 스트레스를 덜 받을 수 있으나
              계획적으로 학습하는데 어려움이 있고 미루는 행동을 보일 수
              있습니다. 정해진 학습량을 제시간에 수행할 수 있도록 시간관리
              학습방법을 도와주세요.
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
              이 학생들은 혼자 학습하는 것을 선호하는 성향입니다. 이 유형이
              높을수록 타인의 시선을 의식하지 않고 자기 주도적이며 독립적 학습이
              가능한 반면 협동과제나 그룹활동에서는 어려움을 경험할 수 있습니다.
              이야기방 활동이나 톡톡 AI도움쌤 등의 기능을 적극적으로 활용하여
              소통적 참여를 할 수 있도록 도와주세요.
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
              소통을 활발하게 하며 학습하는 성향의 학생들은 교사나 또래와의
              사회적 상호작용을 활발하게 하면서 학습하는 성향입니다. 소통을
              활발하게 하며 학습하는 성향이 높을수록 관계 지향적인 성향으로
              인해서 교사나 또래관계에 따라 학업 수행 결과에 변화의 폭이 클 수
              있습니다. 스스로 자기를 인식하여 학습에 대한 생각을 정리하고
              독립적으로 학습을 하는 경험을 늘릴 수 있도록 도와주세요.
            </p>
          </div>
        </div>
        <div class="mt-[60px]">
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
      '학습 콘텐츠를 건너뛰며 점검하는 성향',
      '학습 콘텐츠를 자주 보고 점검하는 성향',
    ]);
    const donutChartDataNmArr2 = ref([
      '신속하게 과제를 수행하는 성향',
      '느긋하게 과제를 수행하는 성향',
    ]);
    const donutChartDataNmArr3 = ref([
      '소통을 활발하게 하며 학습하는 성향',
      '독립적으로 학습하는 성향',
    ]);
    const donutChartColor1 = ref(['#E3ACD0', '#72AFE7']);
    const donutChartColor2 = ref(['#E3ACD0', '#72AFE7']);
    const donutChartColor3 = ref(['#E3ACD0', '#72AFE7']);
    const donutChartSeries1 = ref([80, 100]);
    const donutChartSeries2 = ref([20, 10]);
    const donutChartSeries3 = ref([20, 10]);

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
        qesType: 'LT',
      });

      const resData = submitReponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      alert('설문이 저장되었습니다!');
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

    const donutChartOptions1 = ref({
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
          return `${opts.w.config.series[opts.seriesIndex]}명`;
        },
      },
      legend: {
        position: 'top',
      },
    });

    const donutChartOptions2 = ref({
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
          return `${opts.w.config.series[opts.seriesIndex]}명`;
        },
      },
      legend: {
        position: 'top',
      },
    });

    const donutChartOptions3 = ref({
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
          return `${opts.w.config.series[opts.seriesIndex]}명`;
        },
      },
      legend: {
        position: 'top',
      },
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
        if(item) {
          cArr1.push(item);
        } else {
          cArr1.push(0);
        }
      });
      resData.classPersonality[0].type2.values.map((item) => {
        if(item) {
          cArr2.push(item);
        } else {
          cArr2.push(0);
        }      });
      resData.classPersonality[0].type3.values.map((item) => {
        if(item) {
          cArr3.push(item);
        } else {
          cArr3.push(0);
        }      });

      donutChartSeries1.value = cArr1;
      donutChartSeries2.value = cArr2;
      donutChartSeries3.value = cArr3;

      let uArr1 = [];
      let uArr2 = [];

      
      if(resData.userPersonality[0]['건너뛰며 점검하기']) {
        uArr1.push(parseInt(resData.userPersonality[0]['건너뛰며 점검하기']));
      } else {
        uArr1.push(0);
      }

      if(resData.userPersonality[0]['느긋하게 과제하기']) {
        uArr2.push(-parseInt(resData.userPersonality[0]['느긋하게 과제하기']));
      } else {
        uArr2.push(0);
      }
      
      if(resData.userPersonality[0]['신속하게 과제하기']) {
        uArr1.push(parseInt(resData.userPersonality[0]['신속하게 과제하기']));
      } else {
        uArr1.push(0);
      }
      
      if(resData.userPersonality[0]['건너뛰며 점검하기']) {
        uArr2.push(-parseInt(resData.userPersonality[0]['건너뛰며 점검하기']));
      } else {
        uArr2.push(0);
      }
      
      if(resData.userPersonality[0]['소통하며 학습하기']) {
        uArr1.push(parseInt(resData.userPersonality[0]['소통하며 학습하기']));
      } else {
        uArr1.push(0);
      }
      
      if(resData.userPersonality[0]['독립적으로 학습하기']) {
        uArr2.push(-parseInt(resData.userPersonality[0]['독립적으로 학습하기']));
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
