import { createRouter, createWebHistory } from 'vue-router';

// Importar componentes
import Home from '@/views/home.vue';
import Tasks from '@/views/tasks.vue';
import Users from '@/views/users.vue';
import Auth from '@/views/auth.vue';
import { API } from '@/utils/api';

// Definir as rotas
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true}
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { requiresAuth: false}
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: { requiresAuth: true}
  },
  {
    path: '/user',
    name: 'User',
    component: Users,
    meta: { requiresAuth: true}
  },
];

// Criar o roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const api = new API('http://localhost:8081', 'access_token')

const isAuthenticated = await api.validate()

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      console.error('NEED LOGIN')
      next('/auth')
    } else {
      next()
    }
  } else {
    if (isAuthenticated) {
      next('/')
    } else {
      next()
    };
  }
})

export default router;
