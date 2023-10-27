import { createApp } from "vue";
import App from "./App.vue";
// import VueRouter from "vue-router";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: "/", component: () => import("./page/index.vue") }];

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory("/vvr_wap/"),
    routes, // `routes: routes` 的缩写
});

const app = createApp(App);
app.use(router);

app.mount("#app");
