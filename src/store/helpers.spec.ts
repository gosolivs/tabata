import { checkRange } from "./helpers";
import { Range } from "./types";

describe("store helpers checkRange", () => {
	const range: Range = { min: 0, max: 60 };

	it("value valid", () => {
		const input = 40;

		const result = checkRange(input, range);

		expect(result).toEqual(input);
	});

	it("result min", () => {
		const input = -23;

		const result = checkRange(input, range);

		expect(result).toEqual(range.min);
	});

	it("result max", () => {
		const input = 100;

		const result = checkRange(input, range);

		expect(result).toEqual(range.max);
	});
});
