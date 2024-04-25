import { createRouter, createWebHistory } from "vue-router";
import configURL from "../request/http";

const routes = [
  {
    path: "/",
    component: () => import("@/page/applicationResults/index.vue"),
  },
  {
    path: "/applicationResults",
    name: "applicationResults",
    component: () => import("@/page/applicationResults/index.vue"),
  },
  {
    path: "/applyActivities",
    name: "applyActivities",
    component: () => import("@/page/applyActivities/index.vue"),
  },
  {
    path: "/eventDetails",
    name: "eventDetails",
    component: () => import("@/page/eventDetails/index.vue"),
  },
  {
    path: "/checkDetails",
    name: "checkDetails",
    component: () => import("@/page/CheckDetails/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/activitysupport_wap/"),
  routes,
});

const routerQuery = { code: "", id: "", user_type: "" };

router.beforeEach(async (to: any, from, next) => {
  console.log(from);
  if (to.query.saas_wap_token && !sessionStorage.getItem("go")) {
  }
  next();
});
export { routerQuery };

export default router;
