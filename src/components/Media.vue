<template>
  <div class="media">
    <b-tabs>
      <b-tab title="Media Repositories">
        <div class="justify-content-center row my-1">
          <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
            <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
          </b-form-fieldset>
        </div>
        <b-table striped hover :items="repositories" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
          <template slot="branches" scope="item">
            <b-badge variant="primary" v-for="branch, name in item.item.branches" style="margin-right: 10px;">{{name}} </b-badge>
          </template>
        </b-table>
        <div class="justify-content-center row my-1">
          <b-pagination size="md" :total-rows="this.repositories.length" :per-page="perPage" v-model="currentPage" />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getRepositories();
  },
  methods: {
    getRepositories() {
      this.loggers = [];
      axios.get('http://localhost:31416/api/v1/tree/media/repositories')
        .then((response) => {
          for (let i = 0; i < response.data.length; i += 1) {
            this.getRepository(response.data[i]);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getRepository(name) {
      axios.get(`http://localhost:31416/api/v1/tree/media/repositories/${name}/dump`)
        .then((response) => {
          if (response.data !== 0) {
            this.repositories.push({
              name,
              type: response.data.type,
              path: response.data.path,
              url: response.data.url,
              branch: response.data.branch,
              branches: response.data.branches,
            });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data: () => ({
    repositories: [],
    errors: [],
    fields: {
      name: {
        label: 'Name',
        sortable: true,
      },
      type: {
        label: 'Type',
        sortable: true,
      },
      path: {
        label: 'path',
        sortable: true,
      },
      branch: {
        label: 'Current Branch',
        sortable: true,
      },
      branches: {
        label: 'Branches',
        sortable: true,
      },
      url: {
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
