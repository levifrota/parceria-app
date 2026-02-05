const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'labor', component: () => import('pages/LaborPage.vue') },
      { path: 'postpartum', component: () => import('pages/PostpartumPage.vue') },
      { path: 'contractions', component: () => import('pages/ContractionsPage.vue') },
      { path: 'content/:id', component: () => import('pages/ContentDetailPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },

      // Rota temporária de admin
      {
        path: 'admin/contents',
        component: () => import('pages/CreateContent.vue'),
        meta: { requiresAuth: false }, // Remover em produção
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
