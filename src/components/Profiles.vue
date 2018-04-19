<template>
  <div>
    <div class="modal fade" id="add-profile" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form id="add-profile-form" v-on:submit.prevent="createProfile(name, hostname, port); hideModal()">
            <div class="modal-body">
              <div class="form-group">
                <input class="form-control" type="text" v-model="name" placeholder="Name" />
              </div>
              <div class="form-group row">
                <div class="col-md-9">
                  <input class="form-control" type="text" v-model="hostname" placeholder="Hostname" />
                </div>
                <div class="col-md-3">
                  <input class="form-control" type="number" v-model="port" placeholder="Hostname" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <input type="text" class="form-control form-fullsize" placeholder="Search" v-on:keyup="searchTable" v-model="searchString" autofocus />
    <table class="table table-striped border-top-0 mb-0" data-datatable="true">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Hostname</th>
          <th>Port</th>
          <th class="align-text-bottom" data-orderable="false" data-searchable="false">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="profile in profiles">
          <td>
            <span class="badge badge-primary" v-if="profile.name == defaultProfile">Default</span>
            <span class="badge badge-success" v-if="profile.name == currentProfile">Current</span>
          </td>
          <td><strong>{{ profile.name }}</strong><br />{{ profile.description }}</td>
          <td>{{ profile.hostname }}</td>
          <td>{{ profile.port }}</td>
          <td>
            <div class="btn-group btn-group-sm" role="group">
              <button type="button" class="btn btn-secondary" v-on:click="removeProfile(profile)">Delete</button>
              <button type="button" class="btn btn-secondary" v-on:click="switchToProfile(profile)">Switch To</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary btn-right btn-sm btn-block btn-fullsize font-weight-bold" data-toggle="modal" data-target="#add-profile">+</button>
  </div>
</template>

<script>

import axios from 'axios';
import jQuery from 'jquery/dist/jquery';

export default {
  created() {
    this.getProfiles().then(this.onProfilesLoaded.bind(this));
    this.getDefaultProfile();
    this.getCurrentProfile();
    this.datatable = null;
    this.searchString = '';
  },
  mounted() {
    // Needed, as a second html-autofocus does not work.
    jQuery('input:visible[type=text][autofocus]:first').focus();
    jQuery('.modal').on('shown.bs.modal', function () {
      jQuery(this).find('input[type!=hidden]:visible:first').focus();
    });
  },
  methods: {
    hideModal() {
      jQuery('.modal').modal('hide');
    },
    focusModal() {
      console.log(jQuery('input[type!=hidden]:first', this));
      jQuery('input', this).first().focus();
    },
    searchTable() {
      this.datatable.search(this.searchString).draw();
    },
    destroyTable() {
      this.datatableConfig.order = this.datatable.order();
      this.datatable.destroy();
    },
    createDatatable() {
      const table = jQuery('*[data-datatable]').DataTable(this.datatableConfig);
      jQuery(table.table().container()).addClass('p-0');
      this.datatable = table;
      if (this.searchString.length !== 0) {
        this.searchTable();
      }
    },
    onProfilesLoaded() {
      this.createDatatable();
    },
    getProfiles() {
      return new Promise((resolve, reject) => {
        this.profiles = [];
        const url = `${this.flexHost()}/api/v1/profiles`;
        axios.get(url).then((response) => {
          const promises = [];
          for (let i = 0; i < response.data.length; i += 1) {
            promises.push(this.getProfile(response.data[i]));
          }
          return Promise.all(promises).then(resolve).catch(reject);
        })
        .catch((e) => {
          this.errors.push(e);
          reject();
        });
      });
    },
    getProfile(name) {
      return new Promise((resolve, reject) => {
        const url = `${this.flexHost()}/api/v1/profiles/${name}`;
        axios.get(url).then((response) => {
          if (response.data !== 0) {
            const data = response.data;
            data.name = name;
            this.profiles.push(data);
            resolve();
          }
        })
        .catch((e) => {
          this.errors.push(e);
          reject();
        });
      });
    },
    getDefaultProfile() {
      const url = `${this.flexHost()}/api/v1/tree/profiles/default`;
      axios.get(url).then((response) => {
        this.defaultProfile = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getCurrentProfile() {
      const url = `${this.flexHost()}/api/v1/tree/profiles/current`;
      return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
          this.currentProfile = response.data;
          resolve();
        })
        .catch((e) => {
          this.errors.push(e);
          reject();
        });
      });
    },
    createProfile(name, hostname, port) {
      const url = `${this.flexHost()}/api/v1/profiles/${name}`;
      axios.post(url, {
        name,
        hostname,
        port,
      })
      .then(() => {
        this.destroyTable();
        this.getProfiles().then(this.onProfilesLoaded.bind(this));
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    removeProfile(profile) {
      const url = `${this.flexHost()}/api/v1/profiles/${profile.name}`;
      axios.delete(url)
      .then(() => {
        this.destroyTable();
        this.getProfiles().then(this.onProfilesLoaded.bind(this));
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    switchToProfile(profile) {
      const url = `${this.flexHost()}/api/v1/profiles/${profile.name}/switch`;
      axios.get(url).then(() => {
        this.destroyTable();
        this.getCurrentProfile().then(this.onProfilesLoaded.bind(this));
      }).catch((e) => {
        this.errors.push(e);
      });
    },
  },
  data: () => ({
    profiles: [],
    errors: [],
    datatableConfig: {
      paging: false,
      dom: 't',
      order: [[1, 'asc']],
    },
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
