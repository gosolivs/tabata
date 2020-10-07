import { createApp } from "vue";

import App from "@/layouts/app.vue";
import { locales } from "@/locales/locales";
import { router } from "@/router/router";
import { store } from "@/store/store";

import "@/assets/styles/global.css";

createApp(App).use(locales).use(router).use(store).mount("#app");
