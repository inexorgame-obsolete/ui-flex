<template>
  <div class="profiles">
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

    <b-table striped hover :items="profiles" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
      <template slot="name" scope="item">
        <strong>{{item.item.name}}</strong>
        <br />
        {{item.item.profile.description}}
      </template>
      <template slot="hostname" scope="item">
        {{item.item.profile.hostname}}
      </template>
      <template slot="port" scope="item">
        {{item.item.profile.port}}
      </template>
      <template slot="actions" scope="item">
        <b-btn size="sm" @click="removeProfile(item.item)">Delete</b-btn>
        <b-btn size="sm" @click="switchToProfile(item.item)">Switch To</b-btn>
      </template>
    </b-table>
    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.profiles.length" :per-page="perPage" v-model="currentPage" />
    </div>
    <br />
    <div class="justify-content-center row my-1">
      <b-form-fieldset horizontal label="Name" class="col-3" :label-size="1">
        <b-form-input v-model="name" placeholder="Name"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset horizontal label="Hostname" class="col-3" :label-size="1">
        <b-form-input v-model="hostname" placeholder="Hostname"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset horizontal label="Port" class="col-3" :label-size="1">
        <b-form-input v-model="port" placeholder="Port"></b-form-input>
      </b-form-fieldset>
      <b-form-fieldset horizontal class="col-3">
        <b-btn @click="createProfile(name, hostname, port)">Create new profile</b-btn>
      </b-form-fieldset>
    </div>
    <br />
    <div class="justify-content-center row my-1">
      <b-button-toolbar>
        <b-btn @click="shutdown()" variant="danger">Shutdown Flex</b-btn>
      </b-button-toolbar>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getProfiles();
  },
  methods: {
    getProfiles() {
      this.profiles = [];
      axios.get('http://localhost:31416/api/v1/profiles')
        .then((response) => {
          for (let i = 0; i < response.data.length; i += 1) {
            this.getProfile(response.data[i]);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getProfile(name) {
      const url = `http://localhost:31416/api/v1/profiles/${name}`;
      axios.get(url)
        .then((response) => {
          if (response.data !== 0) {
            this.profiles.push({ name, profile: response.data });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    createProfile(name, hostname, port) {
      const url = `http://localhost:31416/api/v1/profiles/${name}`;
      axios.post(url, {
        name,
        hostname,
        port,
      })
        .then(() => {
          this.getProfiles();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    removeProfile(profile) {
      const url = `http://localhost:31416/api/v1/profiles/${profile.name}`;
      axios.delete(url)
        .then(() => {
          this.getProfiles();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    switchToProfile(profile) {
      const url = `http://localhost:31416/api/v1/profiles/${profile.name}/switch`;
      axios.get(url)
        .then(() => {
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    shutdown() {
      axios.get('http://localhost:31416/api/v1/flex/shutdown')
        .then(() => {
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data: () => ({
    profiles: [],
    errors: [],
    fields: {
      name: {
        label: 'Name',
        sortable: true,
      },
      hostname: {
        label: 'Hostname',
        sortable: true,
      },
      port: {
        label: 'Port',
        sortable: true,
      },
      actions: {
        label: 'Actions',
      },
    },
    currentPage: 1,
    perPage: 5,
    filter: null,
    name: '',
    hostname: 'localhost',
    port: '31416',
  }),
};
</script>
