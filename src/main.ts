import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./route";

const aType = ref({
  status:2,
  storage: 2,
})

const app = createApp(App);
app.provide('$aType', aType)
app.use(router);

app.mount("#app");
