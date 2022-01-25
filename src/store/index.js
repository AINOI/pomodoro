import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timeout = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    items: [],
    finished: [],
    current: '',
    timecount: time,
    breakStatus: false
  },
  mutations: {
    addlist (state, data) {
      state.items.push({
        id: Date.now(),
        name: data,
        edit: false,
        model: data,
        done: false
      })
    },
    editlist (state, data) {
      state.items[data].edit = true
    },
    dellist (state, data) {
      state.items.splice(data, 1)
    },
    updataedit (state, data) {
      state.items[data.id].model = data.value
    },
    submitedit (state, data) {
      state.items[data].name = state.items[data].model
      state.items[data].edit = false
    },
    canceledit (state, data) {
      state.items[data].model = state.items[data].name
      state.items[data].edit = false
    },
    countdown (state) {
      state.timecount--
    },
    finish (state) {
      // 將第一個未完成的狀態改完已完成
      const filterUndone = state.items.filter(item => {
        return !item.done
      })
      const firstId = filterUndone[0].id
      const idx = state.items.findIndex(item => { return item.id === firstId })
      state.items[idx].done = true
      if (filterUndone.length > 1) {
        state.breakStatus = true
        state.timecount = timeout
        console.log(filterUndone)
      } else {
        state.breakStatus = false
        console.log(filterUndone)
        state.timecount = time
      }
    },
    changeItemState (state, data) {
      const idx = state.items.findIndex(item => { return item.id === data })
      state.items[idx].done = !state.items[idx].done
    },
    breakFinished (state) {
      state.timecount = time
      state.breakStatus = false
    }
  },
  actions: {
  },
  modules: {
  }
})
