import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url = 'http://127.0.0.1:8080/';

export default new Vuex.Store({
  state: {
    list: null,
    defaultList: [
      {
        id: 0,
        label: 'Кот'
      },
      {
        id: 1,
        label: 'Кот матроскин'
      },
      {
        id: 2,
        label: 'Кот в сапогах'
      },
      {
        id: 3,
        label: 'Матроскин в сапогах'
      },
      {
        id: 4,
        label: 'Шарик в кедах'
      },
      {
        id: 5,
        label: 'Шарик'
      },
    ]
  },
  getters: {
    allList(state) {
      return state.list;
    },
    defaultList(state) {
      return state.defaultList;
    }
  },
  mutations: {
    getList(state, list) {
      state.list = list
    }
  },
  actions: {
    async fetchList(context) {
      const list = await axios.get(`${url}list`)
      context.commit('getList', list.data)

    },
    async addList(context, obj) {
      await axios({
        method: 'post',
        url: `${url}list`,
        data: obj,
      })
      context.dispatch('fetchList');
    },
    async updateList(context, obj) {
      await axios({
        method: 'put',
        url: `${url}list/${obj.id}`,
        data: obj
      })
      context.dispatch('fetchList');
    },
    async deleteList(context, id) {
      await axios({
        method: 'delete',
        url: `${url}list/${id}`
      })
      context.dispatch('fetchList');
    },
    async clearList(context) {
      await axios({
        method: 'delete',
        url: `${url}list`
      })
      context.dispatch('fetchList');
    }
  }
})
