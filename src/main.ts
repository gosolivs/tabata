import { createApp } from "vue";

import "./styles/global.css";

import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";
import { locales } from "./i18n";

createApp(App)
	.use(locales)
	.use(router)
	.use(store)
	.mount("#app");
