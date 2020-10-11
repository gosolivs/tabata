import { createApp } from "vue";

import App from "@/layouts/app.vue";
import { localesVuePlugin } from "@/locales/locales";
import { router } from "@/router/router";
import "@/store/store";

import "@/assets/styles/global.css";

createApp(App).use(localesVuePlugin).use(router).mount("#app");
