import { createRouter, createWebHistory } from "vue-router";

import routeName from "./routeName";

import Home from "@/views/Home";
import Settings from "@/views/Settings";

export const router = createRouter({
	history: createWebHistory(
		process.env.NODE_ENV === "production" ? "/tabata/" : "/",
	),
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
