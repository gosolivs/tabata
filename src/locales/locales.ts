import { createI18n } from "vue-i18n";

import ru from "./ru.json";

export const locales = (() => {
	return createI18n({
		locale:
			process.env.VUE_APP_I18N_LOCALE != null
				? process.env.VUE_APP_I18N_LOCALE
				: "ru",
		fallbackLocale:
			process.env.VUE_APP_I18N_FALLBACK_LOCALE != null
				? process.env.VUE_APP_I18N_FALLBACK_LOCALE
				: "ru",
		messages: { ru },
	});
})();
