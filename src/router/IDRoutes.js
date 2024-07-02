import IDLayout from '@/layouts/IDLayout.vue';
import IDLoginView from '@/views/id/IDLoginView.vue';
import IDManageReportView from '@/views/id/IDManageReportView.vue';

const IDRoutes = [
  {
    path: '/id',
    component: IDLayout,
    children: [
      {
        path: 'manage-report',
        name: 'manageReport',
        component: IDManageReportView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isManageReport: true,
        },
      },
      {
        path: 'login',
        name: 'IDLogin',
        component: IDLoginView,
        meta: { headerVisible: false, sidebarVisible: false },
      },
    ],
  },
];

export default IDRoutes;
