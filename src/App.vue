<template>
  <b-container fluid id="app" class="app">
    <b-row class="justify-content-between">
      <b-col>
        <b-button variant="success" class="app__button" @click="statusAdd = !statusAdd">Создать новый лист</b-button>
        <b-button variant="danger" class="app__button" @click="removeAll()">Удалить Все</b-button>
        <b-button variant="primary" class="app__button" @click="createDefault()">Генерировать</b-button>
      </b-col>
      <b-col cols="12" md="3">
        <b-form-input v-model="search" placeholder="Search"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="justify-content-center" v-if="statusAdd">
      <b-col cols="4">
        <b-button-group>
          <input type="text" v-model="newList.label">
          <b-button variant="success" @click="createList()">Добавить</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="!status">
        <loader />
      </b-col>
      <b-col cols="12" v-else>
        <custom-list v-for="(elem, index) in searchResult"
                      :key="`${elem.label}-${index}`"
                      :label="elem.label"
                      :index="elem.id"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import customList from '../src/components/customList'
import axios from 'axios'
import loader from '../src/components/loader'

export default {
  name: 'app',
  components: {customList, loader},
  beforeCreate() {
    this.$store.dispatch('fetchList');
  },
  data() {
    return {
      search: '',
      statusAdd: false,
      newList: {
        label: ''
      }
    }
  },
  computed: {
    list() {
      return this.$store.getters.allList
    },
    searchResult() {
      return this.status ? this.list.filter(item => item.label.toLowerCase().includes(this.search.toLowerCase())) : null
    },
    status() {
      return this.list !== null
    }
  },
  methods: {
    createList() {
      this.$store.dispatch('addList', {...this.newList});
      this.statusAdd = false
      this.newList = {
        id: 0,
        label: ''
      }
    },
    removeAll() {
      this.$store.dispatch('clearList')
    },
    createDefault() {
      let arr = this.$store.getters.defaultList;
      for (let elem of arr) {
        this.$store.dispatch('addList', {...elem})
      }
    }
  }
}
</script>

<style lang="scss">
  .app {
    margin: 20px 0;

    &__button {
      margin: {
        right: 10px;
        bottom: 10px;
      }
    }
  }
</style>
