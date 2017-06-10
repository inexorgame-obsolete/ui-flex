<template>
  <div class="instances">
    <br />
    <div class="justify-content-center row my-1">
      <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
        <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
        </b-form-select>
      </b-form-fieldset>
      <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
      </b-form-fieldset>
    </div>

    <b-table striped hover :items="instances" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
      <template slot="name" scope="item">
        <strong>{{item.item.name}}</strong>
        <br />
        {{item.item.description}}
      </template>
      <template slot="actions" scope="item">
        <b-btn size="sm" @click="changeStateAction(item.item, 'start')">Start</b-btn>
        <b-btn size="sm" @click="changeStateAction(item.item, 'connect')">Connect</b-btn>
        <b-btn size="sm" @click="changeStateAction(item.item, 'disconnect')">Disconnect</b-btn>
        <b-btn size="sm" @click="changeStateAction(item.item, 'stop')">Stop</b-btn>
      </template>
    </b-table>
    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.instances.length" :per-page="perPage" v-model="currentPage" />
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getInstances();
  },
  methods: {
    getInstances() {
      this.instances = [];
      axios.get('http://localhost:31416/api/v1/instances')
        .then((response) => {
          for (let i = 0; i < response.data.length; i += 1) {
            this.getInstance(response.data[i]);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getInstance(id) {
      const url = `http://localhost:31416/api/v1/instances/${id}/dump`;
      axios.get(url)
        .then((response) => {
          if (response.data !== 0) {
            this.instances.push(response.data);
          }
          console.log(this.instances);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    changeStateAction(instance, action) {
      const url = `http://localhost:31416/api/v1/instances/${instance.port}/${action}`;
      axios.get(url)
        .then(() => {
          this.getInstances();
        });
    },
  },
  data: () => ({
    instances: [],
    errors: [],
    fields: {
      name: {
        label: 'Name',
        sortable: true,
      },
      port: {
        label: 'Port',
        sortable: true,
      },
      state: {
        label: 'State',
        sortable: true,
      },
      pid: {
        label: 'PID',
        sortable: true,
      },
      autostart: {
        label: 'Auto Start',
        sortable: true,
      },
      autorestart: {
        label: 'Auto Restart',
        sortable: true,
      },
      actions: {
        label: 'Actions',
      },
    },
    currentPage: 1,
    perPage: 5,
    filter: null,
  }),
};
</script>
