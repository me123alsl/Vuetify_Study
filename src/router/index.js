import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/MainView.vue"),
    meta: {
      breadcrumb: "Home",
    },
  },
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: {
      breadcrumb: "Dashboard",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
