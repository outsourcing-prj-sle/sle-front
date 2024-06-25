import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import MySELView from '@/views/MySELView.vue';
import AllSELView from '@/views/AllSELView.vue';
import ReportFinView from '@/views/ReportFinView.vue';
import ReportNoticeView from '@/views/ReportNoticeView.vue';
import ReportQuestionView from '@/views/ReportQuestionView.vue';
import IDTTView from '@/views/IDTTView.vue';
import LearnTTView from '@/views/LearnTTView.vue';
import UpdateUserView from '@/views/UpdateUserView.vue';
import NaverCallBackPage from '@/views/NaverCallBackPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { footerVisible: true, headerVisible: true, needLogin: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { footerVisible: false, headerVisible: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { footerVisible: false, headerVisible: true },
  },
  {
    path: '/mySEL',
    name: 'mySEL',
    component: MySELView,
    meta: {
      footerVisible: true,
      headerVisible: true,
      isMySELView: true,
      needLogin: true,
    },
  },
  {
    path: '/allSEL',
    name: 'allSEL',
    component: AllSELView,
    meta: {
      footerVisible: true,
      headerVisible: true,
      isAllSELView: true,
      needLogin: true,
    },
  },
  {
    path: '/idTT',
    name: 'idTT',
    component: IDTTView,
    meta: {
      footerVisible: true,
      headerVisible: true,
      isSocialTTView: true,
      needLogin: true,
    },
  },
  {
    path: '/learnTT',
    name: 'learnTT',
    component: LearnTTView,
    meta: {
      footerVisible: true,
      headerVisible: true,
      isLearnTTView: true,
      needLogin: true,
    },
  },
  {
    path: '/report/notice/:type',
    name: 'reportNotice',
    component: ReportNoticeView,
    meta: { footerVisible: true, headerVisible: true, needLogin: true },
  },
  {
    path: '/report/question/:type',
    name: 'reportQuestion',
    component: ReportQuestionView,
    meta: { footerVisible: true, headerVisible: true, needLogin: true },
  },
  {
    path: '/report/fin',
    name: 'reportFin',
    component: ReportFinView,
    meta: { footerVisible: true, headerVisible: true, needLogin: true },
  },
  {
    path: '/myInfo',
    name: 'myInfo',
    component: SignupView,
    meta: {
      footerVisible: true,
      headerVisible: true,
      isMyInfoPage: true,
      needLogin: true,
    },
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UpdateUserView,
    meta: {
      footerVisible: true,
      headerVisible: true,
      isMyInfoPage: true,
      needLogin: true,
    },
  },
  {
    path: '/naver/callback',
    name: 'NaverCallBackPage',
    component: NaverCallBackPage,
    meta: {
      // footerVisible: true,
      // headerVisible: true,
      // isMyInfoPage: true,
      // needLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // 뒤로갈곳없으면 메인페이지로
  if (window.history.state && window.history.state.back === null) {
    // 뒤로 갈 곳이 없으면 홈으로 리다이렉트
    if (from.name === null && window.history.length === 1) {
      setTimeout(() => {
        console.log(window.history.state);
      }, 2000);
      next('/');
    }
  }

  const userStore = useUserStore();
  const userId = userStore.id;
  // 로그인 안했으면 로그인페이지로
  if (to.meta?.needLogin && !userId) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
