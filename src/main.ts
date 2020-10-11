import { createApp } from "vue";

import "@/locales/locales";
import "@/store/store";

import App from "@/layouts/app.vue";
import { router } from "@/router/router";

import "@/assets/styles/global.css";

createApp(App).use(router).mount("#app");
