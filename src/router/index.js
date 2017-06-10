import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Profiles from '@/components/Profiles';
import Instances from '@/components/Instances';
import Media from '@/components/Media';
import Servers from '@/components/Servers';
import Interfaces from '@/components/Interfaces';
import Logging from '@/components/Logging';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    }, {
      path: '/profiles',
      name: 'Profiles',
      component: Profiles,
    }, {
      path: '/instances',
      name: 'Instances',
      component: Instances,
    }, {
      path: '/media',
      name: 'Media',
      component: Media,
    }, {
      path: '/servers',
      name: 'Servers',
      component: Servers,
    }, {
      path: '/interfaces',
      name: 'User Interfaces',
      component: Interfaces,
    }, {
      path: '/logging',
      name: 'Logging',
      component: Logging,
    },
  ],
});
