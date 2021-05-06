import Vue from "vue";
import VueRouter from "vue-router";

var ReqAuth = true;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Home.vue"),
    children: [
      {
        path: "/",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../components/Login/LoginUser.vue"
          ),
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../components/Login/RegisterUser.vue"
          ),
      },
      {
        path: "/reset-password",
        name: "resetPassword",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../components/Login/ResetPasswordUser.vue"
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "/",
        name: "agregarPedidos",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Dashboard/Pedidos/AgregarPedido.vue"
          ),
      },
      {
        path: "/pedidosBorrador",
        name: "draftPurchase",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Dashboard/Pedidos/DraftPurchase.vue"
          ),
      },
      {
        path: "/administrarPedidos",
        name: "adminPurchase",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Dashboard/Pedidos/AdminPurchase.vue"
          ),
      },
    ],
  },
  {
    path: "/Cartera",
    component: () =>
      import(/* webpackChunkName: "cartera" */ "../views/Cartera.vue"),
    children: [
      {
        path: "/",
        name: "Cartera",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "cartera" */ "../components/Dashboard/Cartera/IndexDebt.vue"
          ),
      },
    ],
  },
  {
    path: "/*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!ReqAuth) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
