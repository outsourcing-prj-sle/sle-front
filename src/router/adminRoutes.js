import AdminLayout from '@/layouts/AdminLayout.vue';
import adminLoginView from '@/views/admin/adminLoginView.vue';

const adminRoutes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      // {
      //   path: '',
      //   name: 'home',
      //   component: HomeView,
      //   meta: { footerVisible: true, headerVisible: true, needLogin: true },
      // },
      {
        path: 'login',
        name: 'adminLogin',
        component: adminLoginView,
        meta: { footerVisible: false, headerVisible: true },
      },
    ],
  },
];

export default adminRoutes;
