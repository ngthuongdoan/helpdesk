import Vue from "vue";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import VueSuggestion from "vue-suggestion";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

import helpers from "./helper";
import i18n from "./i18n";
import VueFlags from "@growthbunker/vueflags";

Vue.use(VueFlags);
Vue.use(VueSuggestion);
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);

axios.defaults.baseURL = "https://helpdesk-v2-demo.herokuapp.com/v1";
// noinspection JSUnusedGlobalSymbols
Vue.prototype.$helpers = helpers;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
