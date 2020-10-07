import { createApp } from "vue";

import App from "@/layouts/app.vue";
import { store } from "@/store/store";
import { router } from "@/router/router";
import { locales } from "@/locales/locales";

import "@/assets/styles/global.css";

createApp(App).use(locales).use(router).use(store).mount("#app");
