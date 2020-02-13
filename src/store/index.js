import Vue from "vue"
import Vuex from "vuex"
import Timeline from "./Timeline"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Timeline
  }
})

export default store
