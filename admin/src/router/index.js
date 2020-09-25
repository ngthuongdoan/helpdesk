import Vue from "vue";
import VueRouter from "vue-router";
import Master from "../views/Master.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Master,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("../views/index"),
      },
      {
        path: "technicians",
        name: "technicians",
        component: () => import("../views/technicians"),
      },
      {
        path: "tickets",
        name: "tickets",
        component: () => import("../views/tickets"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//Check log in status each routes
router.beforeEach((to, from, next) => {
  let user = store.state.userModule.user;
  if (to.path !== "/login") {
    if (user.loggedIn) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (!user.loggedIn) {
      next();
    } else {
      next(false);
    }
  }
});

export default router;
