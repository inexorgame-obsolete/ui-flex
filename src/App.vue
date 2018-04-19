<template>
  <div id="app" class="container-fluid p-0">
    <div v-if="!flexAlive" class="overlay-warning d-flex">
      <div class="card text-white bg-danger mb-3 mx-auto justify-content-center align-self-center" style="max-width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Flex Unavailable</h5>
          <p class="card-text">Inexor Flex cannot be reached under the specified host. (Host: {{ this.flexHost() }})</p>
          <button v-on:click="updateFlexAlive" class="btn btn-secondary btn-block">Retry</button>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-light bg-light navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="/static/img/inexor-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="Inexor Logo">
        Inexor
      </a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in navItems" v-bind:class="{ 'active': item.active, 'list-item': true }">
            <a v-bind:href="'#' + item.route" class="nav-link">{{ item.label }}</a>
          </li>
        </ul>
      </div>
      <button class="btn btn-outline-danger my-2 my-sm-0" v-on:click="shutdown">Shutdown Flex</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  created() {
    const INTERVAL = 30000; // 30 sec
    this.updateActiveRoute(window.location.hash);
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    this.updateFlexAlive();
    setInterval(this.updateFlexAlive.bind(this), INTERVAL);
  },
  methods: {
    onHashChange() {
      const hash = window.location.hash;
      this.redirectExternal(hash);
      this.updateActiveRoute(hash);
    },
    redirectExternal(hash) {
      const url = hash.substr(hash[1] === '/' ? 2 : 1); // remove # and (if following) /
      try {
        new URL(url); // eslint-disable-line no-new
        window.location.replace(url);
        return true;
      } catch (e) {
        return false;
      }
    },
    updateActiveRoute(hash) {
      // let haveActive = false;
      for (let i = this.navItems.length - 1; i >= 0; i -= 1) {
        // with '(i === 0 && !haveActive) ||'
        // last element will be active as fallback (enable haveActive):
        if (hash.includes(this.navItems[i].route)) {
          this.navItems[i].active = true;
          // haveActive = true;
        } else {
          this.navItems[i].active = false;
        }
      }
    },
    shutdown() {
      const url = `${this.flexHost()}/api/v1/flex/shutdown`;
      axios.get(url).then(() => {
        this.updateFlexAlive();
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    updateFlexAlive() {
      const url = `${this.flexHost()}/api/v1/flex/version`;
      axios.get(url).then(() => {
        this.flexAlive = true;
      }).catch(() => {
        this.flexAlive = false;
      });
    },
  },
  data() {
    return {
      flexAlive: true,
      navItems: [
        {
          route: '/profiles',
          label: 'Profiles',
          active: false,
        },
        {
          route: '/instances',
          label: 'Instances',
          active: false,
        },
        {
          route: '/media',
          label: 'Media',
          active: false,
        },
        {
          route: '/interfaces',
          label: 'Interfaces',
          active: false,
        },
        {
          route: '/releases',
          label: 'Releases',
          active: false,
        },
        {
          route: '/logging',
          label: 'Logging',
          active: false,
        },
        {
          route: '/info',
          label: 'Information',
          active: false,
        },
      ],
    };
  },
};
</script>
