import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Profiles from '@/components/Profiles';
import Instances from '@/components/Instances';
import Instance from '@/components/Instance';
import Media from '@/components/Media';
import Servers from '@/components/Servers';
import Interfaces from '@/components/Interfaces';
import Logging from '@/components/Logging';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    }, {
      path: '/profiles',
      name: 'profiles',
      component: Profiles,
    }, {
      path: '/instances',
      name: 'instances',
      component: Instances,
    }, {
      path: '/instances/:instanceId',
      name: 'instances.detail',
      component: Instance,
    }, {
      path: '/media',
      name: 'media',
      component: Media,
    }, {
      path: '/servers',
      name: 'servers',
      component: Servers,
    }, {
      path: '/interfaces',
      name: 'interfaces',
      component: Interfaces,
    }, {
      path: '/logging',
      name: 'logging',
      component: Logging,
    },
  ],
});
