import Vue from "vue"
import App from "@/App.vue"
import store from "@/store"
import AntDesign from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

Vue.config.productionTip = false
Vue.use(AntDesign)

new Vue({
  store,
  render: h => h(App)
}).$mount("#app")
