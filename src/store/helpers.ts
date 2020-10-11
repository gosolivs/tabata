import { Range } from "./types";

export function checkRange(value: number, range: Range): number {
	switch (true) {
		case value > range.max:
			return range.max;
		case value < range.min:
			return range.min;
		default:
			return value;
	}
}
