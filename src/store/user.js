import router from "@/router";
import axios from "axios";

export const state = () => ({
  user: {
    loggedIn: false,
    data: null,
  },
  faq: [],
});

export const getters = {
  getUser(state) {
    return state.user;
  },
  getFaq(state) {
    return state.faq;
  },
};
export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value;
  },
  SET_USER(state, payload) {
    state.user.data = payload;
  },
  SET_FAQ(state, faq) {
    state.faq = faq;
  },
};

export const actions = {
  logIn({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", user);
    } else {
      commit("SET_USER", null);
    }
  },
  signOut({ commit }) {
    commit("SET_LOGGED_IN", false);
    router.push("/login").then();
  },
  async fetchFaq({ commit }) {
    const res = await axios.get("https://helpdesk-v2.herokuapp.com/v1/faq");
    commit("SET_FAQ", res.data);
  },
};

export const namespaced = true;
