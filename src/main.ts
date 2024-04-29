import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./route";
import { Lazyload } from 'vant';

const aType = ref({
  status:2,
  storage: 2,
})

const app = createApp(App);
app.provide('$aType', aType)
app.use(Lazyload);
app.use(router);

app.mount("#app");
