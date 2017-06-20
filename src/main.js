// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'vue-awesome/icons';

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Icon from 'vue-awesome/components/Icon';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

import App from './App';
import router from './router';

Vue.use(BootstrapVue);
Vue.use(VueMaterial);

Vue.component('icon', Icon);


Vue.component('inexortree', {
  template: `
<div class="inexor-tree-wrapper">
  <treenode :name=path :value=data :path=path v-on:selectNode="selectNode"></treenode>
  <!-- div v-for="(value, name) in data">
    <treenode :name=name :value=value :path='getPath(path, name)' v-on:selectNode="selectNode"></treenode>
  </div -->
</div>`,
  props: ['path', 'data'],
  methods: {
    getPath(path, name) {
      return `${path}.${name}`;
    },
    selectNode(path, name, value) {
      // const newPath = this.getPath(path, name);
      // alert(`inexortree: ${path} ${name} ${value}`);
      this.$emit('selectNode', path, name, value);
    },
  },
});

Vue.component('treenode', {
  template: `
<div class="tree-node-wrapper">
  <div v-if="isObject(value)" class="tree-node">
    <div @click=toggleCollapse>
      <icon v-if="collapsed" name="plus-square-o"></icon>
      <icon v-if="!collapsed" name="minus-square-o"></icon>
      {{name}}
    </div>
    <div v-if="!collapsed" v-for="(value, name) in value">
      <treenode :name=name :value=value :path='getPath(path, name)' v-on:selectNode="selectNode"></treenode>
    </div>
  </div>
  <div v-if="!isObject(value)" @click="selectNode(path, name, value)" class="tree-item">
    <icon name="square-o"></icon> {{name}}
  </div>
</div>`,
  props: ['name', 'value', 'path'],
  data: () => ({
    collapsed: false,
  }),
  methods: {
    isObject(obj) {
      return obj !== null && typeof obj === 'object';
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    isCollapsed() {
      return this.collapsed;
    },
    getPath(path, name) {
      return `${path}.${name}`;
    },
    selectNode(path, name, value) {
      // const newPath = this.getPath(path, name);
   // alert(`treenode: ${path} ${name} ${value}`);
      this.$emit('selectNode', path, name, value);
    },
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App),
});
