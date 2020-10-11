export enum pages {
	home = "home",
	settings = "settings",
}

export const paths: Record<pages, string> = {
	[pages.home]: "/",
	[pages.settings]: "/settings/",
};
