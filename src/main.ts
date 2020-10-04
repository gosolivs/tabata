import { createApp } from "vue";

import App from "@/App.vue";
import { store } from "@/store";
import { router } from "@/router";
import { locales } from "@/locales";

import "./styles/global.css";

createApp(App).use(locales).use(router).use(store).mount("#app");
