import Vue from "vue";
import Vuex from "vuex";
import * as userModule from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
    "modules": {
        userModule,
    },
});
