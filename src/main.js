// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'vue-awesome/icons';

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Icon from 'vue-awesome/components/Icon';

import App from './App';
import router from './router';

Vue.use(BootstrapVue);

Vue.component('icon', Icon);


Vue.component('inexortree', {
  template: `
<div style="margin-left: 20px; margin-top: 10px;">
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
<div style="margin-left: 20px; margin-top: 10px;">
  <div v-if="isObject(value)" class="tree-node">
    <icon name="plus-square-o"></icon> {{name}}
    <div v-for="(value, name) in value">
      <treenode :name=name :value=value :path='getPath(path, name)' v-on:selectNode="selectNode"></treenode>
    </div>
  </div>
  <div v-if="!isObject(value)" @click="selectNode(path, name, value)" class="tree-item">
    <icon name="minus-square-o"></icon> {{name}}
  </div>
</div>`,
  props: ['name', 'value', 'path'],
  methods: {
    isObject(obj) {
      return obj !== null && typeof obj === 'object';
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
