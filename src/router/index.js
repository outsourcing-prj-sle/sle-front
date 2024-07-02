import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';
import { useAdminStore } from '@/store/adminStore.js';
import { useIDStore } from '@/store/IDStore.js';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';
import IDRoutes from './IDRoutes';

// 두 개의 라우트 배열을 병합
const routes = [...userRoutes, ...adminRoutes, ...IDRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin/')) {
    // 관리자 라우트에 대한 로직 추가
    // 뒤로갈곳없으면 메인페이지로
    if (window.history.state && window.history.state.back === null) {
      // 뒤로 갈 곳이 없으면 홈으로 리다이렉트
      if (from.name === null && window.history.length === 1) {
        setTimeout(() => {
          console.log(window.history.state);
        }, 2000);
        next('/admin/site');
      }
    }

    const adminStore = useAdminStore();
    const userId = adminStore.token;
    // 로그인 안했으면 로그인페이지로
    if (to.meta?.needLogin && !userId) {
      next({ name: 'adminLogin', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else if (to.path.startsWith('/id/')) {
    // 관리자 라우트에 대한 로직 추가
    // 뒤로갈곳없으면 메인페이지로
    if (window.history.state && window.history.state.back === null) {
      // 뒤로 갈 곳이 없으면 홈으로 리다이렉트
      if (from.name === null && window.history.length === 1) {
        setTimeout(() => {
          console.log(window.history.state);
        }, 2000);
        next('/id/manage-report');
      }
    }

    const IDStore = useIDStore();
    const userId = IDStore.token;
    // 로그인 안했으면 로그인페이지로
    if (to.meta?.needLogin && !userId) {
      next({ name: 'IDLogin', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    // 일반 유저 페이지
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
    const userId = userStore.token;
    // 로그인 안했으면 로그인페이지로
    if (to.meta?.needLogin && !userId) {
      next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  }
});

export default router;
