import IDLayout from '@/layouts/IDLayout.vue';
import IDLoginView from '@/views/id/IDLoginView.vue';
import IDManageReportView from '@/views/id/IDManageReportView.vue';
import IDTest from '@/views/id/IDTest.vue';
import IDManageReportDtlView from '@/views/id/IDManageReportDtlView.vue'

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
      {
        path: 'IDTest',
        name: 'IDTest',
        component: IDTest,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageReport: true,
        },
      },
      {
        path: 'report',
        name: 'IDManageReportView',
        component: IDManageReportView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageReport: true,
        },
      },
      {
        path: 'report/dtl',
        name: 'IDManageReportDtlView',
        component: IDManageReportDtlView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageReport: true,
        },
      },
    ],
  },
];

export default IDRoutes;
