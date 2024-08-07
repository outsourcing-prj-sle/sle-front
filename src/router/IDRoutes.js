import IDLayout from '@/layouts/IDLayout.vue';
import IDLoginView from '@/views/id/IDLoginView.vue';
import IDManageReportView from '@/views/id/IDManageReportView.vue';
import IDManageReportDtlView from '@/views/id/IDManageReportDtlView.vue';
import IDManageSelView from '@/views/id/IDManageSelView.vue';
import IDManageLtView from '@/views/id/IDManageLtView.vue';
import IDManageResearchView from '@/views/id/IDManageResearchView.vue';
import IDManageResearchInsertView from '@/views/id/IDManageResearchInsertView.vue';

const IDRoutes = [
  {
    path: '/id',
    component: IDLayout,
    children: [
      {
        path: 'login',
        name: 'IDLogin',
        component: IDLoginView,
        meta: { headerVisible: false, sidebarVisible: false },
      },
      {
        path: 'report',
        name: 'IDManageReportView',
        component: IDManageReportView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageReport: true,
          needLogin: true,
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
          needLogin: true,
        },
      },
      {
        path: 'idtt/sel',
        name: 'IDManageSelView',
        component: IDManageSelView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageSel: true,
          needLogin: true,
        },
      },
      {
        path: 'idtt/lt',
        name: 'IDManageLtView',
        component: IDManageLtView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageLt: true,
          needLogin: true,
        },
      },
      {
        path: 'research',
        name: 'IDManageResearchView',
        component: IDManageResearchView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageResearch: true,
          needLogin: true,
        },
      },
      {
        path: 'research/insert',
        name: 'IDManageResearchInsertView',
        component: IDManageResearchInsertView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          isManageResearch: true,
          needLogin: true,
        },
      },
    ],
  },
];

export default IDRoutes;
