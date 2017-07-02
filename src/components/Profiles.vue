<template>
  <div class="profiles">
    <b-tabs>
      <b-tab title="Profiles">
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
          <template slot="badge" scope="item">
            <b-badge variant="primary" v-if="item.item.name == defaultProfile">Default</b-badge>
            <b-badge variant="success" v-if="item.item.name == currentProfile">Current</b-badge>
          </template>
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
      </b-tab>
      <b-tab title="Create new">
        <br />
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="name"></input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Hostname</label>
                <input type="text" class="form-control" v-model="hostname"></input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Port</label>
                <input type="number" class="form-control" v-model="port"></input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <b-button-toolbar>
                <b-btn @click="createProfile(name, hostname, port)">Create new profile</b-btn>
              </b-button-toolbar>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Shutdown">
        <br />
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <b-button-toolbar>
                <b-btn @click="shutdown()" variant="danger">Shutdown Flex</b-btn>
              </b-button-toolbar>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getProfiles();
    this.getDefaultProfile();
    this.getCurrentProfile();
  },
  methods: {
    getProfiles() {
      this.profiles = [];
      axios.get('/api/v1/profiles')
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
      const url = `/api/v1/profiles/${name}`;
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
    getDefaultProfile() {
      axios.get('/api/v1/tree/profiles/default')
        .then((response) => {
          this.defaultProfile = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getCurrentProfile() {
      axios.get('/api/v1/tree/profiles/current')
        .then((response) => {
          this.currentProfile = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    createProfile(name, hostname, port) {
      const url = `/api/v1/profiles/${name}`;
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
      const url = `/api/v1/profiles/${profile.name}`;
      axios.delete(url)
        .then(() => {
          this.getProfiles();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    switchToProfile(profile) {
      const url = `/api/v1/profiles/${profile.name}/switch`;
      axios.get(url)
        .then(() => {
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    shutdown() {
      axios.get('/api/v1/flex/shutdown')
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
      badge: {
        label: '',
        sortable: true,
      },
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
    defaultProfile: 'client',
    currentProfile: 'client',
  }),
};
</script>
