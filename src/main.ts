import { createApp } from "vue";

import "@/locales/locales";
import "@/store/store";

import App from "@/layouts/app.vue";

import "@/assets/styles/global.css";

createApp(App).mount("#app");
