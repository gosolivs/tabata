import { shallowMount } from "@vue/test-utils";

import HomeTimerCycles from "@/components/HomeTimerCycles/HomeTimerCycles";

describe("HomeTimerCycles.vue", () => {
	it("simple render", () => {
		const props = {
			keep: 2,
			total: 30,
		};

		const wrapper = shallowMount(HomeTimerCycles, {
			propsData: props,
			mocks: {
				$t() {},
			},
		});

		expect(wrapper.find(".cycles__keep").text()).toEqual(props.keep.toString());
		expect(wrapper.find(".cycles__total").text()).toMatch(
			props.total.toString(),
		);
	});
});
