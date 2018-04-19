<template>
  <div class="logging">
    <b-tabs>
      <b-tab title="Loggers">
        <div class="justify-content-center row my-1">
          <b-form-fieldset horizontal label="Rows per page" class="col-6">
            <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
            </b-form-select>
          </b-form-fieldset>
          <b-form-fieldset horizontal label="Filter" class="col-6">
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
          </b-form-fieldset>
        </div>
        <b-table striped hover :items="loggers" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
          <template slot="level" slot-scope="item">
            <div class="btn-group" style="border: 1px solid #cccccc; border-radius: 5px;">
              <button type="button" class="btn btn-default btn-sm" v-if="item.item.level != 'trace'" @click="setLogLevel(item.item, 'trace')">trace</button>
              <button type="button" class="btn btn-info btn-sm" v-if="item.item.level == 'trace'">trace</button>
              <button type="button" class="btn btn-default btn-sm" v-if="item.item.level != 'debug'" @click="setLogLevel(item.item, 'debug')">debug</button>
              <button type="button" class="btn btn-info btn-sm" v-if="item.item.level == 'debug'">debug</button>
              <button type="button" class="btn btn-default btn-sm" v-if="item.item.level != 'info'" @click="setLogLevel(item.item, 'info')">info</button>
              <button type="button" class="btn btn-success btn-sm" v-if="item.item.level == 'info'">info</button>
              <button type="button" class="btn btn-default btn-sm" v-if="item.item.level != 'warn'" @click="setLogLevel(item.item, 'warn')">warn</button>
              <button type="button" class="btn btn-warning btn-sm" v-if="item.item.level == 'warn'">warn</button>
              <button type="button" class="btn btn-default btn-sm" v-if="item.item.level != 'error'" @click="setLogLevel(item.item, 'error')">error</button>
              <button type="button" class="btn btn-danger btn-sm" v-if="item.item.level == 'error'">error</button>
              <button type="button" class="btn btn-default btn-sm" v-if="item.item.level != 'fatal'" @click="setLogLevel(item.item, 'fatal')">fatal</button>
              <button type="button" class="btn btn-danger btn-sm" v-if="item.item.level == 'fatal'">fatal</button>
            </div>
          </template>
          <template slot="console" slot-scope="item">
            <icon name="check-square-o" v-if="item.item.console"></icon>
            <icon name="square-o" v-if="!item.item.console"></icon>
          </template>
        </b-table>
        <div class="justify-content-center row my-1">
          <b-pagination size="md" :total-rows="this.loggers.length" :per-page="perPage" v-model="currentPage" />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  created() {
    this.getLoggers();
  },
  methods: {
    getLoggers() {
      this.loggers = [];
      const url = `${this.flexHost()}/api/v1/tree/logging/dump`;
      axios.get(url).then((response) => {
        this.parseLoggers(response.data);
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    parseLoggers(data, path = '') {
      if (typeof data === 'object') {
        if (Object.prototype.hasOwnProperty.call(data, 'level')) {
          this.loggers.push({
            name: path,
            level: (typeof data.level === 'string') ? data.level : '',
            console: (typeof data.console === 'boolean') ? data.console : false,
            file: (typeof data.file === 'string') ? data.file : '',
          });
        }
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i += 1) {
          this.parseLoggers(data[keys[i]], path === '' ? keys[i] : `${path}.${keys[i]}`);
        }
      }
    },
    setLogLevel(item, newLevel) {
      const path = `logging.${item.name}.level`;
      const url = `${this.flexHost()}/api/v1/tree/${path.replace(/\./g, '/')}`;
      axios.post(url, {
        value: newLevel,
        nosync: false,
      })
        .then(() => {
          this.getLoggers();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  data: () => ({
    loggers: [],
    errors: [],
    fields: {
      name: {
        label: 'Name',
        sortable: true,
      },
      level: {
        label: 'Level',
        sortable: true,
      },
      console: {
        label: 'Console',
        sortable: true,
      },
      file: {
        label: 'File',
        sortable: true,
      },
    },
    currentPage: 1,
    perPage: 10,
    filter: null,
  }),
};
</script>
