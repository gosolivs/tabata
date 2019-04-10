import { shallowMount } from "@vue/test-utils";

import Timer from "@/components/Timer/Timer";
import { formatTime } from "@/filters/times/times";

const defaultProps = {
	remained: 20,
	remainedCycles: 5,
	cycles: 5,
};

describe("Timer.vue", () => {
	it("props render", () => {
		const wrapper = shallowMount(Timer, {
			propsData: defaultProps,
			mocks: {
				$t: value => value,
			},
		});

		const keepTime = formatTime(defaultProps.remained);
		expect(wrapper.find(".timer__remained").text()).toMatch(keepTime);
	});
});
