<template>
  <div>
    <!--<input type="text" class="form-control form-fullsize" placeholder="Search" v-on:keyup="searchTable" v-model="searchString" autofocus />-->
    <table class="table table-striped border-top-0 mb-0" data-datatable="true">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Port</th>
          <th class="align-text-bottom" data-orderable="false" data-searchable="false">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instance in instances" v-on:click="">
          <td>
            <a :href="'#/instances/' + instance.port" class="col-link">
              <span class="badge badge-success" v-if="instance.state == 'running'">{{ instance.state }}</span>
              <span class="badge badge-danger" v-if="instance.state == 'stopped'">{{ instance.state }}</span>
              <span class="badge badge-warning" v-if="instance.state == 'started'">{{ instance.state }}</span>
              <span class="badge badge-secondary" v-if="instance.state == 'paused'">{{ instance.state }}</span>
            </a>
          </td>
          <td>
            <a :href="'#/instances/' + instance.port" class="col-link">
              <strong>{{ instance.name }}</strong><br />{{ instance.description }}
            </a>
          </td>
          <td><a :href="'#/instances/' + instance.port" class="col-link">{{ instance.port }}</a></td>
          <td>
            <div class="btn-group btn-group-sm" role="group">
              <button v-if="instance.state == 'stopped'" type="button" class="btn btn-secondary" v-on:click="changeStateAction(instance, 'start')">Start</button>
              <button v-if="instance.state == 'started'" type="button" class="btn btn-secondary" v-on:click="changeStateAction(instance, 'connect')">Connect</button>
              <button v-if="instance.state == 'started'" type="button" class="btn btn-secondary" v-on:click="changeStateAction(instance, 'stop')">Stop</button>
              <button v-if="instance.state == 'running'" type="button" class="btn btn-secondary" v-on:click="changeStateAction(instance, 'disconnect')">Disconnect</button>
              <button v-if="instance.state == 'running'" type="button" class="btn btn-secondary" v-on:click="changeStateAction(instance, 'pause')">Pause</button>
              <button v-if="instance.state == 'paused'" type="button" class="btn btn-secondary" v-on:click="changeStateAction(instance, 'resume')">Resume</button>
              <!--
                <b-btn v-if="item.item.state == 'stopped'" size="sm" @click="changeStateAction(item.item, 'start')">Start</b-btn>
                <b-btn v-if="item.item.state == 'started'" size="sm" @click="changeStateAction(item.item, 'connect')">Connect</b-btn>
                <b-btn v-if="item.item.state == 'running'" size="sm" @click="changeStateAction(item.item, 'disconnect')">Disconnect</b-btn>
                <b-btn v-if="item.item.state == 'running'" size="sm" @click="changeStateAction(item.item, 'pause')">Pause</b-btn>
                <b-btn v-if="item.item.state == 'paused'" size="sm" @click="changeStateAction(item.item, 'resume')">Resume</b-btn>
                <b-btn v-if="item.item.state == 'started'" size="sm" @click="changeStateAction(item.item, 'stop')">Stop</b-btn>
              -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!--
  <div class="instances">
    <b-tabs>
      <b-tab title="Instances">
        <br />
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <div class="justify-content-center row my-1">
              <b-form-fieldset horizontal label="Rows per page" class="col-6">
                <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
                </b-form-select>
              </b-form-fieldset>
              <b-form-fieldset horizontal label="Filter" class="col-6">
                <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
              </b-form-fieldset>
            </div>
            <b-table
              striped
              hover
              :items="instances"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @row-clicked="selectInstance">
              <template slot="port" slot-scope="item">
                <strong>{{item.item.port}}</strong>
              </template>
              <template slot="name" slot-scope="item">
                <strong>{{item.item.name}}</strong>
                <br />
                {{item.item.description}}
              </template>
              <template slot="actions" slot-scope="item">
                <b-btn v-if="item.item.state == 'stopped'" size="sm" @click="changeStateAction(item.item, 'start')">Start</b-btn>
                <b-btn v-if="item.item.state == 'started'" size="sm" @click="changeStateAction(item.item, 'connect')">Connect</b-btn>
                <b-btn v-if="item.item.state == 'running'" size="sm" @click="changeStateAction(item.item, 'disconnect')">Disconnect</b-btn>
                <b-btn v-if="item.item.state == 'running'" size="sm" @click="changeStateAction(item.item, 'pause')">Pause</b-btn>
                <b-btn v-if="item.item.state == 'paused'" size="sm" @click="changeStateAction(item.item, 'resume')">Resume</b-btn>
                <b-btn v-if="item.item.state == 'started'" size="sm" @click="changeStateAction(item.item, 'stop')">Stop</b-btn>
              </template>
            </b-table>
            <div class="justify-content-center row my-1">
              <b-pagination size="md" :total-rows="this.instances.length" :per-page="perPage" v-model="currentPage" />
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Create new">
        <br />
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>ID / Port</label>
                <input type="number" class="form-control" v-model="id"></input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Type</label>
                <select class="form-control" v-model="type">
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
                <input type="text" class="form-control" v-model="name"></input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" v-model="description"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                 <label class="checkbox-inline"><input type="checkbox" v-model="autostart"> Start the instance automatically when Inexor Flex start?</label>
              </div>
              <div class="form-group">
                 <label class="checkbox-inline"><input type="checkbox" v-model="autoconnect"> Connect automatically after starting the instance?</label>
              </div>
              <div class="form-group">
                 <label class="checkbox-inline"><input type="checkbox" v-model="autorestart"> Restart the instance automatically after the instance has been stopped?</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <b-form-fieldset horizontal class="col-4">
                <b-btn variant="primary" @click="createInstance(id, type, name, description, autostart, autoconnect, autorestart)">Create new instance</b-btn>
              </b-form-fieldset>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
-->
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getInstances();
  },
  methods: {
    getInstances() {
      this.instances = [];
      const url = `${this.flexHost()}/api/v1/instances`;
      axios.get(url)
        .then((response) => {
          for (let i = 0; i < response.data.length; i += 1) {
            this.getInstance(response.data[i]);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getInstance(id) {
      const url = `${this.flexHost()}/api/v1/instances/${id}/dump`;
      axios.get(url)
        .then((response) => {
          if (response.data !== 0) {
            this.instances.push(response.data);
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    changeStateAction(instance, action) {
      const url = `${this.flexHost()}/api/v1/instances/${instance.port}/${action}`;
      axios.get(url)
        .then(() => {
          this.getInstances();
        });
    },
    createInstance(id, type, name, description, autostart, autoconnect, autorestart) {
      const url = `${this.flexHost()}/api/v1/instances/${id}`;
      axios.post(url, {
        type,
        name,
        description,
        persistent: false,
        autostart,
        autoconnect,
        autorestart,
      })
        .then(() => {
          this.getInstances();
        });
    },
    selectInstance(item) {
      this.$router.push({
        name: 'instances.detail',
        params: { instanceId: item.port },
      });
    },
  },
  data: () => ({
    instances: [],
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
      actions: {
        label: 'Actions',
      },
    },
    currentPage: 1,
    perPage: 5,
    filter: null,
    id: '',
    type: 'server',
    name: '',
    description: '',
    autostart: true,
    autoconnect: true,
    autorestart: true,
  }),
};
</script>
