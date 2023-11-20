import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./page/applicationResults/index.vue"),
  },
  {
    path: "/applicationResults",
    component: () => import("./page/applicationResults/index.vue"),
  },
  {
    path: "/applyActivities",
    component: () => import("./page/applyActivities/index.vue"),
  },
  {
    path: "/eventDetails",
    component: () => import("./page/eventDetails/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/activitysupport_wap/"),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
