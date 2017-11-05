<template>
  <div class="interfaces">
    <b-tabs>
      <b-tab title="User Interfaces">
        <div class="justify-content-center row my-1">
          <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
            <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
          </b-form-fieldset>
        </div>
        <b-table striped hover :items="interfaces" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
          <template slot="enabled" scope="item">
            <b-badge variant="success" v-if="item.item.enabled === true">Enabled</b-badge>
          </template>
          <template slot="name" scope="item">
            <strong>{{item.item.name}}</strong>
            <br />
            {{item.item.description}}
          </template>
          <template slot="fsPath" scope="item">
            <strong>rel:</strong> {{item.item.relativeFsPath}}
            <br />
            <strong>abs:</strong> {{item.item.absoluteFsPath}}
          </template>
          <template slot="url" scope="item">
            <strong>rel:</strong> {{item.item.relativeUrl}}
            <br />
            <strong>full:</strong> <a :href=item.item.fullUrl target="_blank">{{item.item.fullUrl}}</a>
          </template>
        </b-table>
        <div class="justify-content-center row my-1">
          <b-pagination size="md" :total-rows="this.interfaces.length" :per-page="perPage" v-model="currentPage" />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getInterfaces();
  },
  methods: {
    getInterfaces() {
      this.loggers = [];
      axios.get('/api/v1/tree/interfaces')
        .then((response) => {
          for (let i = 0; i < response.data.length; i += 1) {
            this.getInterface(response.data[i]);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getInterface(name) {
      axios.get(`/api/v1/tree/interfaces/${name}/dump`)
        .then((response) => {
          if (response.data !== 0) {
            this.interfaces.push({
              name,
              description: response.data.description,
              path: response.data.path,
              folder: response.data.folder,
              repository: response.data.repository,
              enabled: response.data.enabled,
              relativeFsPath: response.data.relativeFsPath,
              absoluteFsPath: response.data.absoluteFsPath,
              relativeUrl: response.data.relativeUrl,
              fullUrl: response.data.fullUrl,
            });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data: () => ({
    interfaces: [],
    errors: [],
    fields: {
      enabled: {
        label: '',
        sortable: true,
      },
      name: {
        label: 'Name',
        sortable: true,
      },
      path: {
        label: 'Path',
        sortable: true,
      },
      folder: {
        label: 'Folder',
        sortable: true,
      },
      fsPath: {
        label: 'FS Path',
      },
      url: {
        label: 'URL',
      },
      repository: {
        label: 'Repository URL',
        sortable: true,
      },
    },
    currentPage: 1,
    perPage: 10,
    filter: null,
  }),
};
</script>

