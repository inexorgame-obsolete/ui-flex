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
      <template slot="port" scope="item">
        <strong>{{item.item.port}}</strong>
      </template>
      <template slot="name" scope="item">
        <strong>{{item.item.name}}</strong>
        <br />
        {{item.item.description}}
      </template>
      <template slot="autostart" scope="item">
        <icon name="check-square-o" v-if="item.item.autostart"></icon>
        <icon name="square-o" v-if="!item.item.autostart"></icon>
      </template>
      <template slot="autoconnect" scope="item">
        <icon name="check-square-o" v-if="item.item.autoconnect"></icon>
        <icon name="square-o" v-if="!item.item.autoconnect"></icon>
      </template>
      <template slot="autorestart" scope="item">
        <icon name="check-square-o" v-if="item.item.autorestart"></icon>
        <icon name="square-o" v-if="!item.item.autorestart"></icon>
      </template>
      <template slot="actions" scope="item">
        <b-btn v-if="item.item.state == 'stopped'" size="sm" @click="changeStateAction(item.item, 'start')">Start</b-btn>
        <b-btn v-if="item.item.state == 'started'" size="sm" @click="changeStateAction(item.item, 'connect')">Connect</b-btn>
        <b-btn v-if="item.item.state == 'running'" size="sm" @click="changeStateAction(item.item, 'disconnect')">Disconnect</b-btn>
        <b-btn v-if="item.item.state == 'running'" size="sm" @click="changeStateAction(item.item, 'pause')">Pause</b-btn>
        <b-btn v-if="item.item.state == 'paused'" size="sm" @click="changeStateAction(item.item, 'resume')">Resume</b-btn>
        <b-btn v-if="item.item.state == 'started'" size="sm" @click="changeStateAction(item.item, 'stop')">Stop</b-btn>
      </template>
    </b-table>
    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.instances.length" :per-page="perPage" v-model="currentPage" />
    </div>
    <br />
    <div class="justify-content-center row my-1">
      <b-form-fieldset horizontal label="Id" class="col-4" :label-size="1">
        <b-form-input v-model="id" placeholder="Id"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset horizontal label="Type" class="col-4" :label-size="1">
        <b-form-input v-model="type" placeholder="Type"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset horizontal label="Name" class="col-4" :label-size="1">
        <b-form-input v-model="name" placeholder="Name"></b-form-input>
      </b-form-fieldset>
    </div>
    <div class="justify-content-center row my-1">
      <b-form-fieldset horizontal label="Description" class="col-4" :label-size="1">
        <b-form-input v-model="description" placeholder="Description"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset horizontal label="Autostart" class="col-4" :label-size="1">
        <b-form-checkbox v-model="autostart"></b-form-checkbox>
        <b-form-checkbox v-model="autoconnect"></b-form-checkbox>
        <b-form-checkbox v-model="autorestart"></b-form-checkbox>
      </b-form-fieldset>
      <b-form-fieldset horizontal class="col-4">
        <b-btn @click="createInstance(id, type, name, description, autostart, autoconnect, autorestart)">Create new instance</b-btn>
      </b-form-fieldset>
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
    createInstance(id, type, name, description, autostart, autoconnect, autorestart) {
      const url = `http://localhost:31416/api/v1/instances/${id}`;
      axios.post(url, {
        type,
        name,
        description,
        persistent: false,
        autostart,
        autoconnect,
        autorestart,
      })
        .then(() => {
          this.getInstances();
        });
    },
  },
  data: () => ({
    instances: [],
    errors: [],
    fields: {
      port: {
        label: 'Port',
        sortable: true,
      },
      name: {
        label: 'Name',
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
      autoconnect: {
        label: 'Auto Connect',
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
    id: '',
    type: 'server',
    name: '',
    description: '',
    autostart: true,
    autoconnect: true,
    autorestart: true,
  }),
};
</script>
