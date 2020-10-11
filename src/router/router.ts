import { createRouter } from "@storeon/router";

import { pages, paths } from "./pages";

export type State = {
	page: string;
};

export const router = createRouter<State>([
	[paths.home, () => ({ page: pages.home })],
	[paths.settings, () => ({ page: pages.settings })],
]);
