<template>
  <div class="media">
    <b-tabs>
      <b-tab title="Media Repositories">
        <div class="justify-content-center row">
          <b-form-fieldset horizontal label="Rows per page" class="col-6">
            <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="repositoriesPerPage">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Filter" class="col-6">
            <b-form-input v-model="repositoriesFilter" placeholder="Type to Search"></b-form-input>
          </b-form-fieldset>
        </div>
        <b-table striped hover :items="repositories" :fields="repositoriesFields" :current-page="repositoriesCurrentPage" :per-page="repositoriesPerPage" :filter="repositoriesFilter">
          <template slot="branch" slot-scope="item">
            <b-badge variant="success" v-if="item.item.type == 'git'" style="margin-right: 10px;">{{item.item.branch}} </b-badge>
          </template>
          <template slot="branches" slot-scope="item">
            <b-badge variant="primary" v-if="item.item.type == 'git'" v-for="branch, name in item.item.branches" :key="name" style="margin-right: 10px;">{{name}}</b-badge>
          </template>
        </b-table>
        <div class="justify-content-center row">
          <b-pagination size="md" :total-rows="this.repositories.length" :per-page="repositoriesPerPage" v-model="repositoriesCurrentPage" />
        </div>
      </b-tab>
      <b-tab title="Textures">
        <div class="justify-content-center row">
          <b-form-fieldset horizontal label="Rows per page" class="col-6">
            <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="texturesPerPage">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Filter" class="col-6">
            <b-form-input v-model="texturesFilter" placeholder="Type to Search"></b-form-input>
          </b-form-fieldset>
        </div>
        <b-table striped hover :items="textures" :fields="texturesFields" :current-page="texturesCurrentPage" :per-page="texturesPerPage" :filter="texturesFilter">
        </b-table>
        <div class="justify-content-center row">
          <b-pagination size="md" :total-rows="this.textures.length" :per-page="texturesPerPage" v-model="texturesCurrentPage" />
        </div>
      </b-tab>
      <b-tab title="Maps">
        <div class="justify-content-center row">
          <b-form-fieldset horizontal label="Rows per page" class="col-6">
            <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="mapsPerPage">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Filter" class="col-6">
            <b-form-input v-model="mapsFilter" placeholder="Type to Search"></b-form-input>
          </b-form-fieldset>
        </div>
        <b-table striped hover :items="maps" :fields="mapsFields" :current-page="mapsCurrentPage" :per-page="mapsPerPage" :filter="mapsFilter">
        </b-table>
        <div class="justify-content-center row">
          <b-pagination size="md" :total-rows="this.maps.length" :per-page="mapsPerPage" v-model="mapsCurrentPage" />
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
    this.getTextures();
    this.getMaps();
  },
  methods: {
    getRepositories() {
      this.repositories = [];
      const url = `${this.flexHost()}/api/v1/tree/media/repositories`;
      axios.get(url).then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          this.getRepository(response.data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getRepository(name) {
      const url = `${this.flexHost()}/api/v1/tree/media/repositories/${name}/dump`;
      axios.get(url).then((response) => {
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
    getTextures() {
      this.textures = [];
      const url = `${this.flexHost()}/api/v1/tree/media/textures`;
      axios.get(url).then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          this.getTexturesByAuthor(response.data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getTexturesByAuthor(author) {
      const url = `${this.flexHost()}/api/v1/tree/media/textures/${author}`;
      axios.get(url).then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          this.getTexturesByAuthorAndName(author, response.data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getTexturesByAuthorAndName(author, name) {
      const url = `${this.flexHost()}/api/v1/tree/media/textures/${author}/${name}`;
      axios.get(url).then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          this.getTexturesByAuthorAndNameAndVersion(author, name, response.data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getTexturesByAuthorAndNameAndVersion(author, name, version) {
      const url = `${this.flexHost()}/api/v1/tree/media/textures/${author}/${name}/${version}/dump`;
      axios.get(url).then((response) => {
        if (response.data !== 0) {
          this.textures.push({
            author,
            name,
            version,
            diffuse: response.data.diffuse,
            depth: response.data.depth,
          });
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getMaps() {
      this.textures = [];
      const url = `${this.flexHost()}/api/v1/tree/media/maps`;
      axios.get(url).then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          this.getMapsByAuthor(response.data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getMapsByAuthor(author) {
      const url = `${this.flexHost()}/api/v1/tree/media/maps/${author}`;
      axios.get(url).then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          this.getMapsByAuthorAndName(author, response.data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getMapsByAuthorAndName(author, name) {
      const url = `${this.flexHost()}/api/v1/tree/media/maps/${author}/${name}`;
      axios.get(url).then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          this.getMapsByAuthorAndNameAndVersion(author, name, response.data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getMapsByAuthorAndNameAndVersion(author, name, version) {
      const url = `${this.flexHost()}/api/v1/tree/media/maps/${author}/${name}/${version}/dump`;
      axios.get(url).then((response) => {
        if (response.data !== 0) {
          this.maps.push({
            author,
            name,
            version,
            octree: response.data.octree,
            waypoints: response.data.waypoints,
            config: response.data.config,
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
    textures: [],
    maps: [],
    errors: [],
    repositoriesFields: {
      name: {
        label: 'Name',
        sortable: true,
      },
      type: {
        label: 'Type',
        sortable: true,
      },
      path: {
        label: 'Path',
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
    repositoriesCurrentPage: 1,
    repositoriesPerPage: 10,
    repositoriesFilter: null,
    texturesFields: {
      author: {
        label: 'Author',
        sortable: true,
      },
      name: {
        label: 'Name',
        sortable: true,
      },
      version: {
        label: 'Version',
        sortable: true,
      },
      diffuse: {
        label: 'Diffuse',
        sortable: true,
      },
      depth: {
        label: 'Depth',
        sortable: true,
      },
    },
    texturesCurrentPage: 1,
    texturesPerPage: 10,
    texturesFilter: null,
    mapsFields: {
      author: {
        label: 'Author',
        sortable: true,
      },
      name: {
        label: 'Name',
        sortable: true,
      },
      version: {
        label: 'Version',
        sortable: true,
      },
      octree: {
        label: 'Octree',
        sortable: true,
      },
      waypoints: {
        label: 'Waypoints',
        sortable: true,
      },
    },
    mapsCurrentPage: 1,
    mapsPerPage: 10,
    mapsFilter: null,
  }),
};
</script>
