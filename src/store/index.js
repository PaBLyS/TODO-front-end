import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url = 'http://127.0.0.1:8080/';

export default new Vuex.Store({
  state: {
    list: null
  },
  getters: {
    allList(state) {
      return state.list;
    },
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
      const list = await axios({
        method: 'post',
        url: `${url}list`,
        data: obj,
      })
      context.dispatch('fetchList');
    },
    async updateList(context, obj) {
      const list = axios({
        method: 'put',
        url: `${url}list/${obj.id}`,
        data: obj
      })
      context.dispatch('fetchList');
    },
    async deleteList(context, id) {
      const list = await axios({
        method: 'delete',
        url: `${url}list/${id}`
      })
      context.dispatch('fetchList');
    },
    async clearList(context) {
      const list = await axios({
        method: 'delete',
        url: `${url}list`
      })
      context.dispatch('fetchList');
    }
  }
})
