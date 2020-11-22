import Vue from "vue"
import VueShowdown from "vue-showdown"
import App from "./App.vue"
import router from "./router"
import storage from "./utils/storage"

Vue.config.productionTip = false
Vue.prototype.$storage = storage
Vue.use(VueShowdown, {
  flavor: "github",
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
