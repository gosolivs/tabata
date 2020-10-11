import { mount } from "@vue/test-utils";

import HomeTimerCycles from "@/pages/home/components/home-timer-cycles/home-timer-cycles";

describe("HomeTimerCycles.vue", () => {
	it("simple render", () => {
		const properties = {
			keep: 2,
			total: 30,
		};

		const wrapper = mount(HomeTimerCycles, {
			props: properties,
		});

		expect(wrapper.find(".home-timer-cycles__keep").text()).toEqual(
			properties.keep.toString(),
		);
		expect(wrapper.find(".home-timer-cycles__total").text()).toMatch(
			properties.total.toString(),
		);
	});
});
