import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import MySELView from '../views/MySELView.vue';
import AllSELView from '../views/AllSELView.vue';
import ReportFinView from '../views/ReportFinView.vue';
import ReportNoticeView from '../views/ReportNoticeView.vue';
import ReportQuestionView from '../views/ReportQuestionView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { footerVisible: true, headerVisible: true },
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
    meta: { footerVisible: true, headerVisible: true, isMySELView: true },
  },
  {
    path: '/allSEL',
    name: 'allSEL',
    component: AllSELView,
    meta: { footerVisible: true, headerVisible: true, isAllSELView: true },
  },
  {
    path: '/report/notice/:type',
    name: 'reportNotice',
    component: ReportNoticeView,
    meta: { footerVisible: true, headerVisible: true },
  },
  {
    path: '/report/question/:type',
    name: 'reportQuestion',
    component: ReportQuestionView,
    meta: { footerVisible: true, headerVisible: true },
  },
  {
    path: '/report/fin',
    name: 'reportFin',
    component: ReportFinView,
    meta: { footerVisible: true, headerVisible: true },
  },
  {
    path: '/myInfo',
    name: 'myInfo',
    component: SignupView,
    meta: { footerVisible: true, headerVisible: true, isMyInfoPage: true },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { footerVisible: true, headerVisible: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
