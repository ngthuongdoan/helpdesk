export const state = () => ({
  user: {
    loggedIn: false,
    data: null,
  },
});

export const getters = {
  getUser(state) {
    return state.user;
  },
};
export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value;
  },
  SET_USER(state, payload) {
    state.user.data = payload;
  },
};

export const actions = {
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        displayName: user.displayName,
        token: user.token,
        userName: user.userName,
      });
    } else {
      commit("SET_USER", null);
    }
  },
  signOut({ commit }) {
    commit("SET_LOGGED_IN", false);
    // commit("SET_USER", null);
  },
}

export const namespaced = true;