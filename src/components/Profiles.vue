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
        <b-btn size="sm" @click="deleteProfile(item.item)">Delete</b-btn>
        <b-btn size="sm" @click="switchToProfile(item.item)">Switch To</b-btn>
      </template>
    </b-table>
    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.profiles.length" :per-page="perPage" v-model="currentPage" />
    </div>
    <br />
    <div class="justify-content-center row my-1">
      <b-btn @click="shutdown()">Shutdown</b-btn>
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
          console.log(response);
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
          console.log(this.profiles);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deleteProfile(profile) {
      console.log(profile.name);
    },
    switchToProfile(profile) {
      const url = `http://localhost:31416/api/v1/profiles/${profile.name}/switch`;
      axios.get(url)
        .then((response) => {
          console.log(response);
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
  }),
};
</script>
