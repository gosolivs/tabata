type Dictionary = Record<string, unknown>;

export function flattenDictionary(
	dictionary: Dictionary,
): Record<string, string> {
	const result: Record<string, string> = {};

	Object.entries(dictionary).forEach(([key, value]) => {
		if (typeof value === "object" && value !== null) {
			Object.entries(flattenDictionary(value as Dictionary)).forEach(
				([childKey, childValue]) => {
					result[key + "." + childKey] = childValue;
				},
			);
		}

		if (typeof value === "string") {
			result[key] = value;
		}
	});

	return result;
}
