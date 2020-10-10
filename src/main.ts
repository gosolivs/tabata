import { createApp } from "vue";

import App from "@/layouts/app.vue";
import { localesVuePlugin } from "@/locales/locales";
import { router } from "@/router/router";
import { store } from "@/store/store";

import "@/assets/styles/global.css";

createApp(App).use(localesVuePlugin).use(router).use(store).mount("#app");
