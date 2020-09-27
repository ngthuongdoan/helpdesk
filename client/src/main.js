import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import VueSuggestion from "vue-suggestion";

Vue.use(VueSuggestion);
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "https://helpdesk-v2.herokuapp.com/v1";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
