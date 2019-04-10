import Vue from "vue";

import "./styles/global.css";

import store from "./store";
import router from "./router";
import App from "./App.vue";
import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	i18n,
	render: h => h(App),
}).$mount("#app");
