import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next('/home');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: () => import('@/views/Chat.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Signup.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '*',
    redirect: { name: 'login' },
    beforeEnter: isAuthenticated
  }
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }

  if (to.hash) {
    return { selector: to.hash };
  }

  return { x: 0, y: 0 };
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next();
  }

  if (!store.getters.isAuthenticated) {
    return next({
      path: '/login'
    });
  }

  next();
});

export default router;
