import UserLayout from '@/layouts/UserLayout.vue';
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

const userRoutes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { footerVisible: true, headerVisible: true, needLogin: true },
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        meta: { footerVisible: false, headerVisible: true },
      },
      {
        path: 'signup',
        name: 'signup',
        component: SignupView,
        meta: { footerVisible: false, headerVisible: true },
      },
      {
        path: 'mySEL',
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
        path: 'allSEL',
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
        path: 'idTT',
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
        path: 'learnTT',
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
        path: 'report/notice/:type',
        name: 'reportNotice',
        component: ReportNoticeView,
        meta: { footerVisible: true, headerVisible: true, needLogin: true },
      },
      {
        path: 'report/question/:type',
        name: 'reportQuestion',
        component: ReportQuestionView,
        meta: { footerVisible: true, headerVisible: true, needLogin: true },
      },
      {
        path: 'report/fin',
        name: 'reportFin',
        component: ReportFinView,
        meta: { footerVisible: true, headerVisible: true, needLogin: true },
      },
      {
        path: 'myInfo',
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
        path: 'userInfo',
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
        path: 'naver/callback',
        name: 'NaverCallBackPage',
        component: NaverCallBackPage,
        meta: {},
      },
    ],
  },
];

export default userRoutes;
