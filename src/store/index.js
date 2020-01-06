import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [
      {
        id: 0,
        label: '368567857684126мропмпромо'
      },
      {
        id: 1,
        label: '4567567576567ропмпромроп'
      },
      {
        id: 2,
        label: '45674565758676мропмпромр'
      },
      {
        id: 3,
        label: '546755768549765аропмпромро'
      },
      {
        id: 4,
        label: '56756766789677мпромрпо'
      },
      {
        id: 5,
        label: '7856757878мрпомрпом'
      },
      {
        id: 6,
        label: '756769508760мромрпом'
      },
    ]
  },
  getters: {
    allList(state) {
      return state.list;
    },
  },
  mutations: {
    addList(state, item) {
      state.list.forEach((elem) => {
        if (elem.id > item.id) item.id = elem.id + 1
      })
      state.list.push(item)
    },
    removeList(state, id) {
      state.list.splice(id, 1);
    },
    editList(state, obj) {
      state.list[obj.id] = obj
    },
    clearAll(state) {
      state.list = []
    }
  },
  actions: {
  },
  modules: {
  }
})
