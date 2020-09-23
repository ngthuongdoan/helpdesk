import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueSweetalert from "vue-sweetalert2";
import VueAxios from "vue-axios";

import axios from "axios";
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://localhost:8081";

Vue.config.productionTip = false;

Vue.use(VueSweetalert);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
