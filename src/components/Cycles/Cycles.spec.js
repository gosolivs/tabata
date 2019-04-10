import { shallowMount } from "@vue/test-utils";

import Cycles from "@/components/Cycles/Cycles";

describe("Cycles.vue", () => {
	it("simple render", () => {
		const props = {
			keep: 2,
			total: 30,
		};

		const wrapper = shallowMount(Cycles, {
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
