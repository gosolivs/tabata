import Vue from "vue";
import VueRouter from "vue-router";

import routeName from "./routeName";

import Home from "@/views/Home";
import Settings from "@/views/Settings";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.NODE_ENV === "production" ? "/tabata/" : "/",
	routes: [
		{
			path: "/",
			name: routeName.home,
			component: Home,
		},
		{
			path: "/settings/",
			name: routeName.settings,
			component: Settings,
		},
	],
});

export default router;
