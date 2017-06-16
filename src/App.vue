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
          <b-nav-item to="/profiles">Profiles</b-nav-item>
          <b-nav-item to="/instances">Instances</b-nav-item>
          <b-nav-item to="/media">Media</b-nav-item>
          <b-nav-item to="/servers">Servers</b-nav-item>
          <b-nav-item to="/interfaces">Interfaces</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <br />
    <div class="container">
      <div class="row">
        <router-view></router-view>
      </div>
    </div>
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
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}

.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.btn-circle.btn-lg {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
}

.btn-circle.btn-xxl {
  width: 120px;
  height: 120px;
  padding: 10px 16px;
  font-size: 36px;
  line-height: 1.33;
  border-radius: 60px;
}


</style>
