import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Master.vue"),
    children: [
      {
        path: "",
        name: "Master",
        component: () => import("../views/User/index"),
      },
      {
        path: "/tickets",
        name: "tickets",
        component: () => import("../views/User/tickets"),
      },
      {
        path: "/faq",
        name: "faq",
        component: () => import("../views/User/faq"),
      },
      {
        path: "/send-ticket",
        name: "send-ticket",
        component: () => import("../views/User/send-ticket"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/MasterAdmin.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("../views/Admin/index"),
      },
      {
        path: "technicians",
        name: "technicians",
        component: () => import("../views/Admin/technicians"),
      },
      {
        path: "request",
        name: "request",
        component: () => import("../views/Admin/requests"),
      },
    ],
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
