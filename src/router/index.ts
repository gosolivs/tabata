import { createRouter, createWebHistory } from "vue-router";

import { pages } from "./pages";

import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";

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

export default router;
