<template>
  <div class="flex flex-col bg-white">
    <section
      class="flex gap-5 justify-between px-16 py-6 w-full text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
      style="background-color: #deebf7"
    >
      <div class="flex flex-col my-auto">
        <p class="mt-4 text-base font-medium text-left">
          <span class="font-bold text-xl">사회정서학습</span>은 미국 ‘학업 및
          사회정서학습협회‘(Collaborative for Academic, Social, and Emotional
          Learning: CASEL)가 제안한 자기인식, 자기관리, 사회적 인식, 관계기술,
          책임 있는 의사결정 5가지 사회정서학습 역량과 우리나라 2015 개정
          교육과정의 6가지 핵심역량과 연관성이 있는 역량인 자기관리, 의사소통,
          심미적 감성, 공동체 역량 4가지로 구성되어 있고, 일부의 개념요소가
          반영되어 있습니다. 사회정서학습은 자신의 감정과 느낌을 이해하고
          다루며, 긍정적인 목표를 설정하여 성취하고, 타인을 공감하며 긍정적인
          관계를 맺고 유지하며 공동체 구성원으로서 더불어 살아가는데 필요한
          역량입니다.
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
      <div class="w-[300px] flex justify-start">
        <AppDropdown
          :options="options"
          :startText="selectedOption"
          :openWay="'left'"
          @update:selectedOption="handleSelection"
        />
      </div>

      <div class="mt-4 w-full text-left">
        <b class="text-xl">
          <span class="text-blue-500">홍길동 학생</span>의 사회정서학습 역량
        </b>
        <div class="w-full text-center items-center flex justify-center">
          <Radar
            :data="chartData"
            :options="chartOptions"
            :style="{
              height: '400px',
              position: 'relative',
            }"
          />
        </div>
        <b class="text-xl">*역량별 상세 안내</b>

        <!-- 반복인듯 -->
        <p>
          <span class="text-blue-500 font-medium">내면화 행동 문제</span>란
          정서적 고통 및 어려움과 관련된 생각과 행동을 내면화하는 경향을
          말합니다. 이러한 행동은 타인으로부터의 위축, 슬픔의 감정, 낮은 자존감,
          자신에 대한 부정적인 생각으로 나타날 수 있습니다. 내면화 행동 문제는
          우울증이나 불안과 같은 정신 건강 요인과 관련이 있을 뿐만 아니라 동기
          부여, 실행 기능(주의력, 집중력, 조직력, 계획성), 학업 성취도 등 학생의
          전반적인 기능에 영향을 미칠 수 있으므로 초등학생 시기에 이러한 행동을
          모니터링하는 것은 매우 중요합니다.
        </p>
        <div class="flex gap-[5px] items-end my-[20px]">
          <img
            class="w-[72px] h-[72px]"
            src="../assets/img/idtt-result-middle.png"
            alt="평균"
          />
          <p class="text-xl font-semibold">분석결과:평균범위</p>
        </div>
        <div
          class="w-full border border-gray-300 px-[20px] py-[10px] rounded-xl"
        >
          <p class="font-semibold">
            이 학생은 불안 및 우울증과 관련된 생각과 행동이 평균 범위에
            있습니다. 해당 학생은 불안/우울증과 관련하여 평균적인 수치에
            있으므로 교사의 개입이 필요하지 않습니다. 그러나 학생의 정서적
            안녕을 증진하는 환경을 제공하는 것은 중요합니다. 여기에는 자기
            성찰을 위한 일기 쓰기 장려, 긍정적인 또래 상호작용 촉진, 스트레스
            감소를 위한 마음 챙김 기법 교육 등이 포함될 수 있습니다. 건강한 대처
            전략을 모델링하면 학생의 정서적 회복력을 더욱 향상시킬 수 있습니다.
          </p>
        </div>
        <div class="my-[10px] h-[90px]">
          <p class="font-bold text-xl text-amber-500">교사의 생활지도 tip</p>
        </div>

        <p>
          <span class="text-blue-500 font-medium">외현화 행동 문제</span>는
          외부로 향하는 행동으로 사회적 상호작용, 학업 성취도 및 전반적인 영역에
          지장을 줄 수 있는 행동을 말합니다. 이러한 행동에는 과잉 행동, 충동성,
          주의력이나 자제력 유지의 어려움 등이 포함됩니다. 외현화 행동 문제는
          종종 가정과 학교에서의 행동 문제와 관련이 있으므로 초등학생 시기에
          이러한 행동을 모니터링하는 것이 매우 중요합니다. 외현화 행동 문제는
          주의력, 집중력, 조직력, 계획력 등의 실행 기능에도 지장을 줄 수
          있습니다. 집중력을 유지하거나 과제 완수, 효과적인 시간 관리에 어려움을
          느끼며 학업에 어려움을 겪을 수 있습니다.
        </p>
        <div class="flex gap-[5px] items-end my-[20px]">
          <img
            class="w-[72px] h-[72px]"
            src="../assets/img/idtt-result-low.png"
            alt="평균"
          />
          <p class="text-xl font-semibold">분석결과:평균범위</p>
        </div>
        <div
          class="w-full border border-gray-300 px-[20px] py-[10px] rounded-xl"
        >
          <p class="font-semibold">
            이 학생은 불안 및 우울증과 관련된 생각과 행동이 평균 범위에
            있습니다. 해당 학생은 불안/우울증과 관련하여 평균적인 수치에
            있으므로 교사의 개입이 필요하지 않습니다. 그러나 학생의 정서적
            안녕을 증진하는 환경을 제공하는 것은 중요합니다. 여기에는 자기
            성찰을 위한 일기 쓰기 장려, 긍정적인 또래 상호작용 촉진, 스트레스
            감소를 위한 마음 챙김 기법 교육 등이 포함될 수 있습니다. 건강한 대처
            전략을 모델링하면 학생의 정서적 회복력을 더욱 향상시킬 수 있습니다.
          </p>
        </div>
        <div class="my-[10px] h-[90px]">
          <p class="font-bold text-xl text-amber-500">교사의 생활지도 tip</p>
        </div>

        <p>
          <span class="text-blue-500 font-medium">성장 마인드셋</span>은
          사고방식 또는 개인 통제 신념은 개인이 자신의 생활 환경을 얼마나 통제할
          수 있는지에 대한 생각과 신념을 포함합니다. 학생들이 스스로 환경을
          통제할 수 있다고 느낄 때, 결단력과 인내심을 가지고 도전에 접근할
          가능성이 높아집니다. 따라서 초등학생들에게 노력과 노력을 통해 더 나은
          성과를 낼 수 있다는 믿음을 심어주는 것이 중요합니다. 이러한 사고방식은
          헌신과 연습을 통해 능력과 지능이 시간이 지남에 따라 발전할 수 있다는
          생각을 강조합니다. 뇌 과학 연구에 따르면 우리의 뇌는 도전을 받았을 때
          근육처럼 적응하고 성장할 수 있는 능력이 있다는 사실이 밝혀졌기 때문에
          학생들에게 이러한 사고방식을 길러주는 것이 중요합니다.
        </p>
        <div class="flex gap-[5px] items-end my-[20px]">
          <img
            class="w-[72px] h-[72px]"
            src="../assets/img/idtt-result-high.png"
            alt="평균"
          />
          <p class="text-xl font-semibold">분석결과:평균범위</p>
        </div>
        <div
          class="w-full border border-gray-300 px-[20px] py-[10px] rounded-xl"
        >
          <p class="font-semibold">
            이 학생은 불안 및 우울증과 관련된 생각과 행동이 평균 범위에
            있습니다. 해당 학생은 불안/우울증과 관련하여 평균적인 수치에
            있으므로 교사의 개입이 필요하지 않습니다. 그러나 학생의 정서적
            안녕을 증진하는 환경을 제공하는 것은 중요합니다. 여기에는 자기
            성찰을 위한 일기 쓰기 장려, 긍정적인 또래 상호작용 촉진, 스트레스
            감소를 위한 마음 챙김 기법 교육 등이 포함될 수 있습니다. 건강한 대처
            전략을 모델링하면 학생의 정서적 회복력을 더욱 향상시킬 수 있습니다.
          </p>
        </div>
        <div class="my-[10px] h-[90px]">
          <p class="font-bold text-xl text-amber-500">교사의 생활지도 tip</p>
        </div>
        <div
          class="w-full border border-gray-300 px-[20px] py-[10px] rounded-xl mb-[50px]"
        >
          <p class="font-semibold mb-[30px]">
            현실적으로 달성가능한 작은 목표를 설정하여 큰 목표 달성을 위한 단계
            밟기
          </p>
          <p class="font-semibold mb-[30px]">
            중기 목표: 수학 성적 향상<br />
            중기목표를 달성을 위한 단기 목표 설정:<br />
            단기 목표 1: 매일 수학 문제 5개씩 풀기.<br />
            단기 목표 2: 주 2회 수학 보충 수업 1시간씩 듣기.<br />
            단기 목표 3: 매주 틀린 문제 10개 이상 다시 풀어보기.<br />
            실천 예시: 영희는 매일 30분씩 시간을 정해 수학 문제 5개를 풉니다. 주
            2회 학교에서 제공하는 수학 보충 수업(1시간)에 참석합니다. 매주
            주말에는 그 주에 틀린 문제를 10개이상 다시 풀어보며 복습합니다.
            이러한 작은 목표들을 달성하는 과정을 통해 큰 목표를 달성할 수
            있습니다.
          </p>
          <p>• 주체성과 자기효능감 키우기</p>
          <p class="ml-[10px]">- 스스로 결정하기</p>
          <p>
            교사는 학생이 스스로 주간 학습 계획을 세우도록 지도합니다. 스스로
            결정한 계획을 따라서 학습하면서, 주체성과 자기효능감을 느낍니다.
          </p>
        </div>

        <p>
          <span class="text-blue-500 font-medium">감정 지식</span>은 자신과
          타인의 감정을 정확하게 식별하고, 이해하고, 관리하는 능력과 관련이
          있습니다. 이는 특정 상황에서 다른 사람이 어떻게 느낄 수 있는지
          이해하고 그 감정을 정확하게 분류하는 것뿐만 아니라 다양한 감정을
          다루는 대처 전략을 파악하는 것도 포함됩니다. 감정에 대한 지식이 풍부한
          학생은 사회적 상호작용을 탐색하고 긍정적인 관계를 구축하며 갈등을
          효과적으로 해결하는 능력이 더 뛰어난 것으로 밝혀졌습니다. 또한 자신의
          감정을 이해하고 관리하는 데 더 능숙하여 정서적 회복력, 일반적인
          행복감과 높은 학업 성취도로 이어집니다.
        </p>
        <div class="flex gap-[5px] items-end my-[20px]">
          <img
            class="w-[72px] h-[72px]"
            src="../assets/img/idtt-result-low.png"
            alt="평균"
          />
          <p class="text-xl font-semibold">분석결과:평균범위</p>
        </div>
        <div
          class="w-full border border-gray-300 px-[20px] py-[10px] rounded-xl"
        >
          <p class="font-semibold">
            이 학생은 불안 및 우울증과 관련된 생각과 행동이 평균 범위에
            있습니다. 해당 학생은 불안/우울증과 관련하여 평균적인 수치에
            있으므로 교사의 개입이 필요하지 않습니다. 그러나 학생의 정서적
            안녕을 증진하는 환경을 제공하는 것은 중요합니다. 여기에는 자기
            성찰을 위한 일기 쓰기 장려, 긍정적인 또래 상호작용 촉진, 스트레스
            감소를 위한 마음 챙김 기법 교육 등이 포함될 수 있습니다. 건강한 대처
            전략을 모델링하면 학생의 정서적 회복력을 더욱 향상시킬 수 있습니다.
          </p>
        </div>
        <div class="my-[10px] h-[90px]">
          <p class="font-bold text-xl text-amber-500">교사의 생활지도 tip</p>
        </div>

        <div>
          <p>
            <span class="text-blue-500 font-medium">홍길동 학생</span>의
            사회정서학습 AI분석 의견조사
          </p>
          <div class="my-[20px]">
            <p>
              Q1. AI가 진단한 피드백 내용과 오프라인에서 살펴본 학생에 대한
              선생님의 의견이 얼마나 일치하였나요?*
            </p>
            <div class="flex gap-[20px] p-[20px]">
              <div class="flex gap-[10px]">
                <input type="radio" id="question01_1" name="question01" />
                <label for="question01_1" class="pr-[50px] cursor-pointer">
                  <img
                    class="w-[170px] h-[32px]"
                    src="../assets/img/idtt-star-1.png"
                    alt="star1"
                  />
                </label>
              </div>
              <div class="flex gap-[10px]">
                <input type="radio" id="question01_2" name="question01" />
                <label for="question01_2" class="pr-[50px] cursor-pointer">
                  <img
                    class="w-[170px] h-[32px]"
                    src="../assets/img/idtt-star-2.png"
                    alt="star1"
                  />
                </label>
              </div>
              <div class="flex gap-[10px]">
                <input type="radio" id="question01_3" name="question01" />
                <label for="question01_3" class="pr-[50px] cursor-pointer">
                  <img
                    class="w-[170px] h-[32px]"
                    src="../assets/img/idtt-star-3.png"
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
                  <input type="checkbox" id="question02_1" name="question02" />
                  <label for="question02_1" class="pr-[50px] cursor-pointer">
                    내면화 행동 문제
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="question02_2" name="question02" />
                  <label for="question02_2" class="pr-[50px] cursor-pointer">
                    외현화 행동 문제
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="question02_3" name="question02" />
                  <label for="question02_3" class="pr-[50px] cursor-pointer">
                    감정지식
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="question02_4" name="question02" />
                  <label for="question02_4" class="pr-[50px] cursor-pointer">
                    성장 마인드 셋
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
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '@/service/UserService.js';
import AppDropdown from '../components/AppDropdown.vue';
import { _mixDate } from '@/utils/utils.js';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'vue-chartjs';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default {
  components: {
    AppDropdown,
    Radar,
  },
  setup() {
    const router = useRouter();
    const infoArr = ref([]);

    const chartData = {
      labels: [
        '내면화 행동 문제',
        '감정지식',
        '성장 마인트 셋',
        '외면화 행동 문제',
      ],
      datasets: [
        {
          label: '학급 평균',
          data: [28, 48, 40, 19],
          fill: true,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
        {
          label: '홍길동 학생',
          data: [65, 59, 90, 81],
          fill: true,
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
        },
      ],
    };

    const chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 15,
            },
          },
        },
      },
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    };

    const options = ref([
      '홍길동(dlwkr01@gne.go.kr)',
      '홍길동(dlwkr01@gne.go.kr)',
      '홍길동(dlwkr01@gne.go.kr)',
    ]);
    const selectedOption = ref('홍길동(dlwkr01@gne.go.kr)');

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      const mySELResponse = await UserService.getMySEL();
      const resData = mySELResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      infoArr.value = resData;
    };

    const handleSelection = (option) => {
      selectedOption.value = option;
    };

    const goReportNoticePage = (type = 1) => {
      router.push({
        name: 'reportNotice',
        params: { type: type },
      });
    };

    const goReportQuestionPage = (type = 1) => {
      router.push({
        name: 'reportQuestion',
        params: { type: type },
      });
    };

    const mixDate = (s, e) => {
      return _mixDate(s, e);
    };

    return {
      options,
      selectedOption,
      infoArr,
      handleSelection,
      goReportNoticePage,
      goReportQuestionPage,
      mixDate,
      chartData,
      chartOptions,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
