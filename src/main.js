import { createApp } from "vue";
import "./style.css";
import "../src/assets/css/index.css";
import App from "./App.vue";
import { Icon } from "@iconify/vue";
import router from "./router";

// createApp(App).component("Icon", Icon).mount("#app").use(router);
const app = createApp(App);
app.use(router);
app.mount("#app");
app.component("Icon", Icon);
