const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Todo.vue')
      },
      {
        path: '/settings',
        component: () => import('src/pages/Settings.vue')
      },
      {
        path: '/settings/help',
        component: () => import('src/pages/Help.vue')
      },
      {
        path: '/auth',
        component: () => import('src/pages/Auth.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
