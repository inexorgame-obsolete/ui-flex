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
      <b-tab title="Console">
        <h1>Instance {{$route.params.instanceId}} Console</h1>
      </b-tab>
      <b-tab title="Tree">
        <h1>Instance {{$route.params.instanceId}} Tree</h1>
        <b-card>I'm the card in tab</b-card>
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
