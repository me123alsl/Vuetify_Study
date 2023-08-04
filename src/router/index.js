import { createRouter, createWebHistory } from "vue-router";
import { useBreadCrumbsStore } from "@/stores/breadCrumbsStore";

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
      isFirst: true,
    },
  },
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: {
      breadcrumb: "Dashboard",
      isFirst: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const breadCrumbsStore = useBreadCrumbsStore();
  if (to.meta.isFirst) {
    breadCrumbsStore.clearBreadCrumbs();
  }
  breadCrumbsStore.addBreadCrumb({
    title: to.meta.breadcrumb,
    to: to.path,
    disabled: true,
  });
});
export default router;
