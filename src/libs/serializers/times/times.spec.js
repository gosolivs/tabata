import { formatTime } from "@/libs/serializers/times/times";

describe("times.js", () => {
	it("0 seconds", () => {
		const seconds = 0;
		expect(formatTime(seconds)).toEqual("00:00");
	});

	it("less a minute", () => {
		const seconds = 30;
		expect(formatTime(seconds)).toEqual("00:30");
	});

	it("over a minute", () => {
		const seconds = 150;
		expect(formatTime(seconds)).toEqual("02:30");
	});

	it("over 100 minutes", () => {
		const seconds = 6001;
		expect(formatTime(seconds)).toEqual("100:01");
	});
});
