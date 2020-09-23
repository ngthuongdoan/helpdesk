import Vue from "vue";
import VueRouter from "vue-router";
import Master from "../views/Master.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/mafa",
    component: Master,
    children: [
      {
        path: "/",
        name: "mafaIndex",
        component: () => import("../views/index"),
      },
      {
        path: "info",
        name: "mafaInfo",
        component: () => import("../views/info"),
      },
      {
        path: "foods",
        name: "mafaFoods",
        component: () => import("../views/foods"),
      },
      {
        path: "/employees",
        name: "mafaEmployees",
        component: () => import("../views/employees"),
      },
      {
        path: "/posts",
        name: "mafaPosts",
        component: () => import("../views/posts"),
      },
      {
        path: "/bills",
        name: "mafaBills",
        component: () => import("../views/bills"),
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
