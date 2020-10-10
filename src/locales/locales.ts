import { Plugin } from "vue";

import { flattenDictionary } from "./helpers";
import ru from "./ru.json";

const dictionary = flattenDictionary(ru);

const translator = (key: string): string =>
	dictionary[key] != null ? dictionary[key] : key;

export const useI18n = () => ({
	t: translator,
});

export const localesVuePlugin: Plugin = {
	install: (app) => {
		app.config.globalProperties.$t = translator;
	},
};
