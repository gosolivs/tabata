import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

function loadLocaleMessages(): Record<string, LocaleMessages<VueMessageType>> {
	const locales = require.context(
		".",
		true,
		/[A-Za-z0-9-_,\s]+\.json$/i,
	);
	const messages: Record<string, LocaleMessages<VueMessageType>> = {};

	locales.keys().forEach(key => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i);

		if (matched && matched.length > 1) {
			console.log(typeof locales(key));
			const locale = matched[1];
			messages[locale] = locales(key);
		}
	});

	return messages;
}

export const locales = createI18n({
	locale: process.env.VUE_APP_I18N_LOCALE || "ru",
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "ru",
	messages: loadLocaleMessages(),
});
