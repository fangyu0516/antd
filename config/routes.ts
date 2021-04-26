export default [
  {
    path: '/',
    redirect: '/home/statistics',
  },
  {
    path:"/home",
    name: 'home',
    icon: 'dashboard',
    routes: [
      {
        path: '/home/statistics',
        name: 'statistics',
        component: '@/pages/home/statistics',
      },
      {
        path: '/home/realtime',
        name: 'realtime',
        component: '@/pages/home/realtime',
      },
    ],
  },
  {
    path: '/taskcenter',
    name: 'taskcenter',
    icon: 'Reconciliation',
    routes: [
      {
        path: '/taskcenter/keywordsrank',
        name: 'keywordsrank',
        icon: 'Ci',
        component: '@/pages/taskcenter/keywordsrank',
      },
    ],
  },
  {
    path: '/toolbox',
    name: 'toolbox',
    icon: 'tool',
    component: '@/pages/toolbox',
    routes: [
      {
        path: '/toolbox/articleoriginal',
        name: 'tool-articleoriginal',
        icon: 'Highlight',
        hideInMenu: true,
        component: '@/pages/toolbox/articleoriginal',
      },
    ],
  },
  {
    path: '/users',
    name: 'users',
    icon: 'Contacts',
    access: 'canSuper' || 'canAdmin',
    component: '@/pages/users',
  },
  {
    path: '/upload',
    name: 'upload',
    icon: 'smile',
    hideInMenu: true,
    component: '@/pages/seo',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
    ],
  },
  {
    component: './404',
  },
];
