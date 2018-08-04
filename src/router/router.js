import { routes } from './routes';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!localStorage.getItem('auth')) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next();
    }
  } else {
    next();
  }
});
