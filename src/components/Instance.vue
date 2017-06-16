<template>
  <div class="instance">
    <b-tabs>
      <b-tab title="State">
        <br />
        <div class="container">
          <div class="row">
            <div class="col-md-2" style="text-align: center;">
              <b-btn class="btn btn-primary btn-circle btn-xxl">
                <icon :name="states[instance.state].icon"></icon>
              </b-btn>
              <br />
              <strong>{{states[instance.state].label}}</strong>
            </div>
            <div class="col-sm-10 col-md-6">
              <div class="container">
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                    <div class="form-group">
                      <label>State</label>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="instance.state" readonly>
                        <span class="input-group-btn">
                          <button type="button" class="btn btn-primary" v-if="instance.state == 'stopped'" @click="changeStateAction(instance, 'start')">Start</button>
                          <button type="button" class="btn btn-primary" v-if="instance.state == 'started'" @click="changeStateAction(instance, 'connect')">Connect</button>
                          <button type="button" class="btn btn-primary" v-if="instance.state == 'running'" @click="changeStateAction(instance, 'disconnect')">Disconnect</button>
                          <button type="button" class="btn btn-primary" v-if="instance.state == 'running'" @click="changeStateAction(instance, 'pause')">Pause</button>
                          <button type="button" class="btn btn-primary" v-if="instance.state == 'paused'" @click="changeStateAction(instance, 'resume')">Resume</button>
                          <button type="button" class="btn btn-primary" v-if="instance.state == 'started'" @click="changeStateAction(instance, 'stop')">Stop</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                    <div class="form-group">
                      <label>Process PID</label>
                      <input type="text" class="form-control" v-model="instance.pid" readonly>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Configuration" active>
        <br />
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-4">
              <div class="form-group">
                <label>Profile</label>
                <input type="text" class="form-control" v-model="currentProfile" readonly>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-group">
                <label>Port</label>
                <input type="text" class="form-control" v-model="instance.port">
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-group">
                <label>Type</label>
                <select class="form-control" v-model="instance.type">
                  <option>server</option>
                  <option>client</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="instance.name">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Description</label>
                <textarea rows="5" class="form-control" v-model="instance.description">
                </textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                 <label class="checkbox-inline"><input type="checkbox" v-model="instance.autostart"> Start the instance automatically when Inexor Flex start?</label>
              </div>
              <div class="form-group">
                 <label class="checkbox-inline"><input type="checkbox" v-model="instance.autoconnect"> Connect automatically after starting the instance?</label>
              </div>
              <div class="form-group">
                 <label class="checkbox-inline"><input type="checkbox" v-model="instance.autorestart"> Restart the instance automatically after the instance has been stopped?</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <b-button-toolbar>
                <button type="button" class="btn btn-primary" @click="saveInstance()">Save</button>
              </b-button-toolbar>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Tree">
        <div class="row">
          <div class="col-md-3">
            <tree-view :data="instance" :options=treeOptions></tree-view>
          </div>
          <div class="col-md-9">
            <br />
            <h3>Tree Node</h3>
            <br />
            <div class="form-group">
              <label>Datatype</label>
              <input type="text" class="form-control" v-model="instance.name">
            </div>
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" v-model="instance.name">
            </div>
            <div class="form-group">
              <label>Value</label>
              <input type="text" class="form-control" v-model="instance.name">
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
    this.getCurrentProfile();
    this.getInstance(this.$route.params.instanceId);
    this.treeOptions.rootObjectKey = `/instances/${this.$route.params.instanceId}`;
  },
  methods: {
    getInstance(id) {
      const url = `http://localhost:31416/api/v1/instances/${id}/dump`;
      axios.get(url)
        .then((response) => {
          if (response.data !== 0) {
            this.instance = response.data;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    saveInstance() {
      alert('Not implemented');
    },
    changeStateAction(instance, action) {
      const url = `http://localhost:31416/api/v1/instances/${instance.port}/${action}`;
      axios.get(url)
        .then(() => {
          this.getInstance(this.$route.params.instanceId);
        });
    },
    getCurrentProfile() {
      axios.get('http://localhost:31416/api/v1/tree/profiles/current')
        .then((response) => {
          this.currentProfile = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data: () => ({
    instance: {},
    currentProfile: '',
    treeOptions: {
      maxDepth: 99,
      rootObjectKey: 'root',
    },
    states: {
      stopped: {
        label: 'Stopped',
        icon: 'stop',
      },
      started: {
        label: 'Started',
        icon: 'mail-forward',
      },
      running: {
        label: 'Running',
        icon: 'play',
      },
      paused: {
        label: 'Paused',
        icon: 'pause',
      },
    },
    errors: [],
    fields: {
      port: {
        label: 'Port',
        sortable: true,
      },
      name: {
        label: 'Name',
        sortable: true,
      },
      state: {
        label: 'State',
        sortable: true,
      },
      pid: {
        label: 'PID',
        sortable: true,
      },
      autostart: {
        label: 'Auto Start',
        sortable: true,
      },
      autoconnect: {
        label: 'Auto Connect',
        sortable: true,
      },
      autorestart: {
        label: 'Auto Restart',
        sortable: true,
      },
      actions: {
        label: 'Actions',
      },
    },
  }),
};
</script>

<style>
.tree-view-item {
  font-family: monospace;
  font-size: 16px;
  margin-left: 18px;
}

.tree-view-wrapper {
  overflow: auto;
  margin-top: 20px;
}

/* Find the first nested node and override the indentation */
.tree-view-item-root > .tree-view-item-leaf > .tree-view-item {
  /* margin-left: 40px; */
}

/* Root node should not be indented */
.tree-view-item-root {
  margin-left: 18px;
}

.tree-view-item-node {
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}

.tree-view-item-leaf {
  white-space: nowrap;
  padding-left: 18px;
}

/*
.tree-view-item-key {
  font-weight: bold;
  padding-left: 18px;
}

.tree-view-item-key-with-chevron {
  padding-left: 14px;
}


.tree-view-item-key-with-chevron.opened::before {
    top:4px;
    transform: rotate(90deg);  
    -webkit-transform: rotate(90deg);
}

.tree-view-item-key-with-chevron::before {
    color: #444;
    content: '\25b6';
    font-size: 10px;
    left: 1px;
    position: absolute;
    top: 3px;
    transition: -webkit-transform .1s ease;
    transition: transform .1s ease;
    transition: transform .1s ease, -webkit-transform .1s ease;
    -webkit-transition: -webkit-transform .1s ease;
}
*/

.tree-view-item-hint {
  color: #ccc
}

</style>

