import { mount } from "@vue/test-utils";

import HomeTimerCycles from "@/components/home-timer-cycles/home-timer-cycles";
import { locales } from "@/locales/locales";

describe("HomeTimerCycles.vue", () => {
	it("simple render", () => {
		const properties = {
			keep: 2,
			total: 30,
		};

		const wrapper = mount(HomeTimerCycles, {
			props: properties,
			global: {
				plugins: [locales],
			},
		});

		expect(wrapper.find(".cycles__keep").text()).toEqual(
			properties.keep.toString(),
		);
		expect(wrapper.find(".cycles__total").text()).toMatch(
			properties.total.toString(),
		);
	});
});
