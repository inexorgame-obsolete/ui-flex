<template>
  <div class="releases">
    <b-tabs>
      <b-tab title="Releases">
        <div class="justify-content-center row my-1">
          <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
            <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
          </b-form-fieldset>
        </div>
        <b-table striped hover :items="releases" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
          <template slot="progressBar" scope="item">
            <loading-progress
              :progress="item.item.progress"
              shape="line"
              size="64"
            />
            <br />
            {{Math.floor(item.item.progress * 100)}} %
          </template>
        </b-table>
        <div class="justify-content-center row my-1">
          <b-pagination size="md" :total-rows="this.releases.length" :per-page="perPage" v-model="currentPage" />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getChannels();
  },
  methods: {
    getChannels() {
      this.releases = [];
      axios.get('/api/v1/tree/releases/channels')
        .then((response) => {
          for (let i = 0; i < response.data.length; i += 1) {
            this.getVersions(response.data[i]);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getVersions(channel) {
      axios.get(`/api/v1/tree/releases/channels/${channel}`)
        .then((response) => {
          for (let i = 0; i < response.data.length; i += 1) {
            this.getVersion(channel, response.data[i]);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getVersion(channel, version) {
      axios.get(`/api/v1/tree/releases/channels/${channel}/${version}/dump`)
        .then((response) => {
          if (response.data !== 0) {
            const progress = response.data.fileSize > 0 ?
                (response.data.fileSizeDownloaded / response.data.fileSize) : 0;
            this.releases.push({
              version: response.data.version,
              channel: response.data.channel,
              path: response.data.path,
              fileSize: response.data.fileSize,
              fileSizeDownloaded: response.data.fileSizeDownloaded,
              progress,
              name: response.data.name,
              provider: response.data.provider,
              isDownloaded: response.data.isDownloaded,
              isInstalled: response.data.isInstalled,
              preRelease: response.data.preRelease,
              createdAt: response.data.createdAt,
            });
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data: () => ({
    releases: [],
    errors: [],
    fields: {
      channel: {
        label: 'Channel',
        sortable: true,
      },
      version: {
        label: 'Version',
        sortable: true,
      },
      createdAt: {
        label: 'Release Date',
        sortable: true,
      },
      fileSize: {
        label: 'File Size',
        sortable: true,
      },
      fileSizeDownloaded: {
        label: 'Downloaded ',
      },
      progressBar: {
        label: 'Progress',
      },
      isDownloaded: {
        label: 'Downloaded',
        sortable: true,
      },
      isInstalled: {
        label: 'Installed',
        sortable: true,
      },
      preRelease: {
        label: 'Pre Release',
        sortable: true,
      },
    },
    currentPage: 1,
    perPage: 10,
    filter: null,
  }),
};
</script>

