<template>
  <div>
    <AppQRPopup @closePopup="() => closePopup()" v-if="isAgree" class="z-50">
      <div class="max-w-[650px] text-left">
        <h1 class="font-bold text-2xl text-center">SEL 사회정서분석</h1>
        <div class="border border-gray-400 my-[20px] p-[20px] rounded-md">
          <div>
            <p class="text-xl">
              <span class="font-bold">SEL 사회정서분석</span>이(가) 개인정보에
              접근하는 것에 동의하십니까?
            </p>
            <p class="mt-[10px] mb-[20px]">
              <span class="font-bold"
                >제공된 정보는 이용자 식별, 통게, 게정, 연동 및 고객 지원 등을
                위해 서비스 이용기간 동안 활용/보관됩니다.</span
              >
              이용자 식별자와 함께 아래의 필수 항목이 제공됩니다. 본 제공 동의를
              거부할 권리가 있으나, 거부 시에는 SEL 사회정서분석이(가) 제공하는
              서비스 이용이 불가능합니다.
            </p>
          </div>
          <div>
            <p class="text-xl font-bold my-[10px]">필수 제공 정보</p>
            <div class="flex gap-[10px] flex-wrap">
              <div class="flex gap-[5px]">
                <input type="checkbox" id="id" checked disabled />
                <label for="id">아이디</label>
              </div>
              <div class="flex gap-[5px]">
                <input type="checkbox" id="userNm" checked disabled />
                <label for="userNm">이름</label>
              </div>
              <div class="flex gap-[5px]">
                <input type="checkbox" id="profileImageId" checked disabled />
                <label for="profileImageId">프로필 이미지</label>
              </div>
              <div class="flex gap-[5px]">
                <input type="checkbox" id="userType" checked disabled />
                <label for="userType">사용자 구분</label>
              </div>
              <div class="flex gap-[5px]">
                <input type="checkbox" id="userSpaceInfo" checked disabled />
                <label for="id">소속 스페이스 정보</label>
              </div>
              <div class="flex gap-[5px]">
                <input
                  type="checkbox"
                  id="userOrgnlSpaceInfo"
                  checked
                  disabled
                />
                <label for="userOrgnlSpaceInfo">소속 조직 정보</label>
              </div>
              <div class="flex gap-[5px]">
                <input type="checkbox" id="uniqId" checked disabled />
                <label for="uniqId">고유 번호</label>
              </div>
              <div class="flex gap-[5px]">
                <input type="checkbox" id="relationInfo" checked disabled />
                <label for="relationInfo">관계 정보</label>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-[60px] text-center">
          <p>
            동의 후에는 해당 서비스의 이용약관 및 개인정보처리방침에 따라 정보가
            관리됩니다.
          </p>
          <div class="my-[20px] flex justify-center gap-[20px]">
            <button
              @click="closePopup"
              class="border border-gray-500 w-[250px] h-[50px] rounded-md"
            >
              취소
            </button>
            <button
              @click="agreeUserInfo"
              class="border border-emerald-400 w-[250px] h-[50px] bg-emerald-400 text-white rounded-md"
            >
              동의하기
            </button>
          </div>
        </div>
      </div>
    </AppQRPopup>
    <section
      class="max-w-[30rem] mx-auto p-6 bg-white border border-gray-300 rounded-md"
      :class="{ 'absolute top-1/2 left-1/2 transform-center': isSignUp }"
    >
      <h1 class="text-2xl font-semibold mb-4">회원가입</h1>

      <form @submit.prevent="handleSignUp">
        <div class="mb-1 flex items-center">
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >아이디:</label
          >

          <div class="flex items-center flex-1">
            <input
              type="text"
              id="username"
              v-model="username"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />

            <button
              type="button"
              @click="checkUsername"
              class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md min-w-[96px]"
            >
              중복체크
            </button>
          </div>
        </div>

        <span
          v-if="usernameCheckResult"
          class="text-sm text-green-500"
          :class="{
            'text-red-500 pr-[75px]':
              usernameCheckResult === '사용 불가능한 아이디입니다.',
          }"
          >{{ usernameCheckResult }}</span
        >

        <div class="mb-4 mt-4 flex items-center">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >비밀번호:</label
          >

          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >비밀번호<br />확인:</label
          >

          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >이름:</label
          >

          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="홍길동"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4 flex items-center">
          <label class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >성별:</label
          >

          <div class="flex items-center">
            <label class="mr-4 cursor-pointer"
              ><input type="radio" value="M" v-model="gender" class="mr-1" />

              남</label
            >

            <label class="cursor-pointer"
              ><input type="radio" value="F" v-model="gender" class="mr-1" />

              여</label
            >
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="birthdate"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >생년월일:</label
          >

          <input
            type="text"
            id="birthdate"
            v-model="birthdate"
            placeholder="YYYYMMDD"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            maxlength="8"
          />
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >이메일:</label
          >

          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="example@email.com"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4 flex items-center">
          <label class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >구분:</label
          >

          <div class="flex items-center">
            <label class="mr-4 cursor-pointer"
              ><input type="radio" value="N" v-model="userType" class="mr-1" />

              학생</label
            >

            <label class="cursor-pointer"
              ><input type="radio" value="Y" v-model="userType" class="mr-1" />

              선생님</label
            >
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="school"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >학교:</label
          >

          <input
            type="text"
            id="school"
            v-model="school"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="grade"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >학년:</label
          >

          <input
            type="text"
            id="grade"
            v-model="grade"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="class"
            class="block text-sm font-medium text-gray-700 mr-1.5 min-w-20"
            >반:</label
          >

          <input
            type="text"
            id="class"
            v-model="classroom"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          회원가입
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '@/service/UserService';
import AppQRPopup from '@/components/AppQRPopup.vue';

export default {
  components: {
    AppQRPopup,
  },
  setup() {
    const router = useRouter();

    const isAgree = ref(false);
    const username = ref('');
    const usernameCheckData = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const gender = ref('');
    const name = ref('');
    const birthdate = ref('');
    const email = ref('');
    const userType = ref('');
    const school = ref('');
    const grade = ref('');

    const classroom = ref('');
    const usernameCheckResult = ref('');

    const isSignUp = computed(() => {
      return location.pathname === '/signup';
    });

    const checkUsername = async () => {
      if (!username.value) {
        return;
      }

      // 아이디 체크
      const signupResponse = await UserService.checkId({
        id: username.value,
      });
      const resData = signupResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }
      if (!resData) {
        usernameCheckResult.value = '사용 가능한 아이디입니다.';
        usernameCheckData.value = username.value;
      } else {
        usernameCheckResult.value = '사용 불가능한 아이디입니다.';
      }
    };

    const handleSignUp = async () => {
      if (!usernameCheckResult.value) {
        alert('아이디 중복체크를 해주세요');
        return;
      }

      if (username.value !== usernameCheckData.value) {
        alert('아이디 중복체크를 다시해주세요.');
        usernameCheckResult.value = '';
        return;
      }

      if (password.value !== confirmPassword.value) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }

      if (!gender.value) {
        alert('성별을 선택해주세요');
        return;
      }

      if (!userType.value) {
        alert('구분을 선택해주세요.');
        return;
      }

      if (!name.value) {
        alert('이름을 입력해주세요.');
        return;
      }

      if (!birthdate.value) {
        alert('생년월일을 입력해주세요');
        return;
      }

      if (!email.value) {
        alert('이메일을 입력해주세요.');
        return;
      }

      if (!school.value) {
        alert('학교를 입력해주세요');
        return;
      }

      if (!grade.value) {
        alert('학년을 숫자로 입력해주세요');
        return;
      }

      if (!classroom.value) {
        alert('반을 숫자로 입력해주세요');
        return;
      }

      isAgree.value = true;
    };

    const agreeUserInfo = async () => {
      // 회원가입
      const signupResponse = await UserService.signup({
        id: username.value, // 아이디
        name: name.value, // 사용자명
        password: password.value, // 비밀번호
        profileImageId: 'asdf', // 프로필 이미지 아이디
        userEmail: email.value, // 이메일
        sex: gender.value, // 성별 - todo : 구분자 알아야함 - f / m
        userType: userType.value, // 사용자 구분 - todo : 구분자 알아야함 - student, teacher?
        userSpaceInfo: school.value, // 소속 스페이스 정보
        gradeNm: grade.value,
        classNm: classroom.value,
        relationInfo: 'asdf', // 관계 정보 - ?..
      });

      const resData = signupResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      alert('회원가입 성공');
      router.back();
    };

    const closePopup = () => {
      isAgree.value = false;
    };

    return {
      isAgree,
      username,
      password,
      confirmPassword,
      gender,
      name,
      birthdate,
      email,
      userType,
      school,
      grade,
      classroom,
      isSignUp,
      usernameCheckResult,
      checkUsername,
      handleSignUp,
      agreeUserInfo,
      closePopup,
    };
  },
};
</script>

<style scoped>
.transform-center {
  transform: translate(-50%, -50%);
}
</style>
