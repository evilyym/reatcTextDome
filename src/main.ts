import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/1",
    component: () => import("./page/applicationResults/index.vue"),
  },
  {
    path: "/2",
    component: () => import("./page/index.vue"),
  },
  {
    path: "/3",
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
