import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

createApp(App).use(ElementPlus).use(store, key).use(router).mount("#app");
