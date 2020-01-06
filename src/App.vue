<template>
  <b-container fluid id="app" class="app">
    <b-row class="justify-content-between">
      <b-col cols="4">
        <b-button variant="success" class="app__button" @click="statusAdd = !statusAdd">Создать новый лист</b-button>
        <b-button variant="danger" class="app__button" @click="removeAll()">Удалить Все</b-button>
      </b-col>
      <b-col cols="2">
        <b-form-input v-model="search" placeholder="Search"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="justify-content-center" v-if="statusAdd">
      <b-col cols="3">
        <b-button-group>
          <input type="text" v-model="newList.label">
          <b-button variant="success" @click="createList()">Добавить</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <custom-list v-for="(elem, index) in searchResult"
                      :key="index"
                      :label="elem.label"
                      :index="index"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import customList from '../src/components/customList'

export default {
  name: 'app',
  components: {customList},
  data() {
    return {
      search: '',
      statusAdd: false,
      newList: {
        id: 0,
        label: ''
      }
    }
  },
  computed: {
    list() {
      return this.$store.getters.allList
    },
    searchResult() {
      return this.list.filter(item => item.label.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  methods: {
    createList() {
      this.$store.commit('addList', {...this.newList})
      this.statusAdd = false
      this.newList = {
        id: 0,
        label: ''
      }
    },
    removeAll() {
      this.$store.commit('clearAll')
    }
  }
}
</script>

<style lang="scss">
  .app {
    margin: 20px 0;

    &__button {
      margin-right: 10px;
    }
  }
</style>
