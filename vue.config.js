module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/tabata/" : "/",
	productionSourceMap: false,

	pluginOptions: {
		i18n: {
			locale: "ru",
			fallbackLocale: "ru",
			localeDir: "locales",
			enableInSFC: false,
		},
	},
};
