export enum pages {
	home = "home",
	settings = "settings",
}

export const paths: Record<pages, string> = {
	[pages.home]: getBasePath("/"),
	[pages.settings]: getBasePath("/settings/"),
};

function getBasePath(path: string): string {
	return [process.env.NODE_ENV === "production" ? "/tabata/" : "/", path]
		.join("/")
		.replace(/\/{2,}/g, "/");
}
