import { createRouter, createWebHistory } from "vue-router";
// import { inject } from 'vue'

const routes = [
  // {
  //   path: "/",
  //   name: "index",
  //   component: () => import("@/page/applicationResults/index.vue"),
  // },
  {
    // 1維護工 有提交權限
    path: "/maintenancePersonnel",
    name: "maintenancePersonnel",
    component: () => import("@/page/maintenancePersonnel/index.vue"),
  },
  {
    // 2用戶列表 沒有提交權限
    path: "/generalUser",
    name: "generalUser",
    component: () => import("@/page/generalUser/index.vue"),
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
  // const global = inject('$aType')
  if (to.query.saas_wap_token && !sessionStorage.getItem("go")) {
  }
  next();
});
export { routerQuery };

export default router;
