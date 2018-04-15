<template>
  <div class="info">
    <b-tabs>
      <b-tab title="Configuration">
        <div class="card">
          <div class="card-header">System information</div>
          <div class="card-body">
            <b-list-group>
              <b-list-group-item class="col-md-12">
                <strong>Flex version: </strong> {{ version }}
              </b-list-group-item>
              <b-list-group-item class="col-md-12">
                <strong>Platform: </strong> {{ sysinfo.platform }}
              </b-list-group-item>
              <b-list-group-item class="col-md-12">
                <strong>Platform release: </strong> {{ sysinfo.release }}
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Paths</div>
          <div class="card-body">
            <b-list-group>
              <b-list-group-item v-for="path in Object.entries(sysinfo.paths)" class="col-md-12">
                <strong>{{ path[0] }}: </strong> {{ path[1] }}
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </b-tab>
      <b-tab title="Log">
        <b-table striped hover :items="log.content" :fields="fields"></b-table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    let url = `${this.flexHost()}/api/v1/flex/version`;
    axios.get(url).then((response) => {
      this.version = response.data.version;
    }).catch((e) => {
      this.errors.push(e);
    });

    url = `${this.flexHost()}/api/v1/flex/sysinfo`;
    axios.get(url).then((response) => {
      this.sysinfo = response.data;
    }).catch((e) => {
      this.errors.push(e);
    });

    url = `${this.flexHost()}/api/v1/flex/log/${this.log.name}`;
    axios.get(url).then((response) => {
      this.log.content = response.data;
    }).catch((e) => {
      this.errors.push(e);
    });
  },
  computed: {
    config() {
      const config = Array.map(Object.keys(this.sysinfo), key => ({
        name: key,
        setting: this.sysinfo[key],
      }));

      return config;
    },
  },
  data: () => ({
    fields: {
      name: {
        label: 'Name',
      },
      hostname: {
        label: 'Hostname',
      },
      level: {
        label: 'Level',
      },
      msg: {
        label: 'Message',
      },
      time: {
        label: 'Time',
      },
      pid: {
        label: 'PID',
      },
    },
    sysinfo: {
      paths: { },
    },
    version: '',
    log: {
      name: 'flex.server.FlexServer',
      content: [],
    },
    errors: [],
  }),
};
</script>
