<template>
  <div id="app">
    <b-navbar toggleable type="inverse" variant="primary">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="/">
        <img src="./assets/inexor-logo.svg" style="width: 50px; height: 58px;">
        <span>Inexor Flex</span>
      </b-link>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item to="profiles">Profiles</b-nav-item>
          <b-nav-item to="instances">Instances</b-nav-item>
          <b-nav-item to="media">Media</b-nav-item>
          <b-nav-item to="servers">Servers</b-nav-item>
          <b-nav-item to="interfaces">Interfaces</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
