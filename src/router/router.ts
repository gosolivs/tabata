import { createRouter, createWebHistory } from "vue-router";

import { pages } from "./pages";

import Home from "@/pages/home/index.vue";
import Settings from "@/pages/settings/index.vue";

export const router = createRouter({
	history: createWebHistory(
		process.env.NODE_ENV === "production" ? "/tabata/" : "/",
	),
	routes: [
		{
			path: "/",
			name: pages.home,
			component: Home,
		},
		{
			path: "/settings/",
			name: pages.settings,
			component: Settings,
		},
	],
});
