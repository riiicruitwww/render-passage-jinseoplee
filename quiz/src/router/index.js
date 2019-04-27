import Vue from 'vue';
import Router from 'vue-router';
import Intro from '@/components/Intro';
import Training from '@/components/Training';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro,
    },
    {
      path: '/training',
      name: 'Training',
      component: Training,
    },
  ],
});
