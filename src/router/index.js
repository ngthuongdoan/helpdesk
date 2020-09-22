import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Master",
    component: () => import("../views/Master.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/index"),
      },
      {
        path: "/tickets",
        name: "tickets",
        component: () => import("../views/tickets"),
      },
      {
        path: "/faq",
        name: "faq",
        component: () => import("../views/faq"),
      },
      {
        path: "/send-ticket",
        name: "send-ticket",
        component: () => import("../views/send-ticket"),
      },
      {
        path: "/send-ticket",
        name: "send-ticket",
        component: () => import("../views/send-ticket"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = store.state.userModule.user;
  if (to.path !== "/login") {
    if (user.loggedIn === true) {
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
