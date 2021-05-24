import Vue from "vue";
import vueStore from '@/store/index'
import VueRouter from "vue-router";

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
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "/",
        name: "agregarPedidos",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Dashboard/Pedidos/Pedido.vue"
          ),
      },
      {
        path: "/pedidos-borrador",
        name: "BorradorPedidos",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Dashboard/Pedidos/BorradorPedidos.vue"
          ),
      },
      {
        path: "/administrar-Pedidos",
        name: "AdminPedido",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Dashboard/Pedidos/AdminPedido.vue"
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
            /* webpackChunkName: "cartera" */ "../components/Dashboard/Cartera/Cartera.vue"
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
    if (!vueStore.getters['user/isUserLoggedIn']) {
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
