import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Profiles from '@/components/Profiles';
import Instances from '@/components/Instances';
import Instance from '@/components/Instance';
import Media from '@/components/Media';
import Servers from '@/components/Servers';
import Interfaces from '@/components/Interfaces';
import Releases from '@/components/Releases';
import Logging from '@/components/Logging';
import Info from '@/components/Info';

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
      path: '/releases',
      name: 'releases',
      component: Releases,
    }, {
      path: '/logging',
      name: 'logging',
      component: Logging,
    }, {
      path: '/info',
      name: 'info',
      component: Info,
    },
  ],
});
