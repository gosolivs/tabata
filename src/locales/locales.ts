import { flattenDictionary } from "./helpers";
import ru from "./ru.json";

const dictionary = flattenDictionary(ru);

const translator = (key: string): string =>
	dictionary[key] != null ? dictionary[key] : key;

export const useI18n = () => ({
	t: translator,
});
