import AdminLayout from '@/layouts/AdminLayout.vue';
import adminLoginView from '@/views/admin/adminLoginView.vue';
import adminSiteView from '@/views/admin/adminSiteView.vue';

const adminRoutes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'site',
        name: 'adminSite',
        component: adminSiteView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isReportManage: true,
        },
      },
      {
        path: 'login',
        name: 'adminLogin',
        component: adminLoginView,
        meta: { headerVisible: false },
      },
    ],
  },
];

export default adminRoutes;
