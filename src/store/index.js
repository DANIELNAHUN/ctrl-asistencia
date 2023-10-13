import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allowedUsers: [
      {
        user: "dcalcina",
        password: "dcalcina",
        fullname: "Daniel Calcina",
        shortname: "DCALCINA",
        id_user: 1,
      },]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
