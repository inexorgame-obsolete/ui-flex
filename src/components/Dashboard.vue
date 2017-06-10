<template>
  <div class="hello">
    <b-card no-block>
      <b-tabs>
        <b-tab title="Tab 1">
          Tab 1 Contents
        </b-tab>
        <b-tab title="Tab 2">
          Tab 2 Contents <b-button size="md">Boop</b-button>
        </b-tab>
        <b-tab title="Tab 3" disabled>
          Tab 3 Contents
        </b-tab>
      </b-tabs>
    </b-card>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
