<template>
  <div class="row p-3">
    <div class="col col-md-6 pr-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">System Information</h5>
          <dl class="row">
            <dt class="col-sm-3">Flex version</dt>
            <dd class="col-sm-9"><code>{{ version }}</code></dd>
            <dt class="col-sm-3">Platform</dt>
            <dd class="col-sm-9"><code>{{ sysinfo.platform }}</code></dd>
            <dt class="col-sm-3">Release</dt>
            <dd class="col-sm-9"><code>{{ sysinfo.release }}</code></dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="col col-md-6 pl-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Paths</h5>
          <dl class="row">
            <template v-for="path in Object.entries(sysinfo.paths)">
              <dt class="col-sm-3">{{ path[0] }}</dt>
              <dd class="col-sm-9"><code>{{ path[1] }}</code></dd>
            </template>
          </dl>
        </div>
      </div>
    </div>
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
