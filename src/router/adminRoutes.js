import AdminLayout from '@/layouts/AdminLayout.vue';
import adminLoginView from '@/views/admin/adminLoginView.vue';
import adminSiteView from '@/views/admin/adminSiteView.vue';
import adminTermView from '@/views/admin/adminTermView.vue';
import adminCodeManageView from '@/views/admin/adminCodeManageView.vue';
import adminCodeDetailView from '@/views/admin/adminCodeDetailView.vue';
import adminManageView from '@/views/admin/adminManageView.vue';
import adminLogView from '@/views/admin/adminLogView.vue';
import adminIPView from '@/views/admin/adminIPView.vue';
import adminIPUpdateView from '@/views/admin/adminIPUpdateView.vue';
import adminUserView from '@/views/admin/adminUserView.vue';
import adminSiteUpdateView from '@/views/admin/adminSiteUpdateView.vue';
import adminCodeUpdateView from '@/views/admin/adminCodeUpdateView.vue';
import adminCodeDetailUpdateView from '@/views/admin/adminCodeDetailUpdateView.vue';
import adminManageUpdateView from '@/views/admin/adminManageUpdateView.vue';
import adminUserUpdateView from '@/views/admin/adminUserUpdateView.vue';

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
          isSystemManagement: true,
          isSite: true,
        },
      },
      {
        path: 'term',
        name: 'adminTerm',
        component: adminTermView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isTerm: true,
        },
      },
      {
        path: 'site/update',
        name: 'adminSiteUpdate',
        component: adminSiteUpdateView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isSite: true,
        },
      },
      {
        path: 'code',
        name: 'adminCode',
        component: adminCodeManageView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isCode: true,
        },
      },
      {
        path: 'code/update',
        name: 'adminCodeUpdate',
        component: adminCodeUpdateView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isCode: true,
        },
      },
      {
        path: 'code/detail',
        name: 'adminCodeDetail',
        component: adminCodeDetailView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isCode: true,
        },
      },
      {
        path: 'code/detail/update',
        name: 'adminCodeDetailUpdate',
        component: adminCodeDetailUpdateView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isCode: true,
        },
      },
      {
        path: 'ip',
        name: 'adminIP',
        component: adminIPView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isIP: true,
        },
      },
      {
        path: 'ip/update',
        name: 'adminIPUpdate',
        component: adminIPUpdateView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isSystemManagement: true,
          isIP: true,
        },
      },
      {
        path: 'login',
        name: 'adminLogin',
        component: adminLoginView,
        meta: { headerVisible: false },
      },
      {
        path: 'manage',
        name: 'adminManage',
        component: adminManageView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isManagement: true,
        },
      },
      {
        path: 'manage/update',
        name: 'adminManageUpate',
        component: adminManageUpdateView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isManagement: true,
        },
      },
      {
        path: 'log',
        name: 'adminLog',
        component: adminLogView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isLogManagement: true,
        },
      },
      {
        path: 'user/:userType',
        name: 'adminUser',
        component: adminUserView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isUserManangement: true,
        },
      },
      {
        path: 'user/:userType/update',
        name: 'adminUserUpdate',
        component: adminUserUpdateView,
        meta: {
          headerVisible: true,
          sidebarVisible: true,
          needLogin: true,
          isUserManangement: true,
        },
      },
    ],
  },
];

export default adminRoutes;
