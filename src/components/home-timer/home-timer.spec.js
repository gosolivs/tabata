import { mount } from "@vue/test-utils";

import HomeTimer from "@/components/home-timer/home-timer";
import { formatTime } from "@/libs/serializers/times/times";
import { locales } from "@/locales/locales";

const defaultProps = {
	remained: 20,
	remainedCycles: 5,
	cycles: 5,
};

describe("HomeTimer.vue", () => {
	it("props render", () => {
		const wrapper = mount(HomeTimer, {
			props: defaultProps,
			global: {
				plugins: [locales],
			},
		});

		const keepTime = formatTime(defaultProps.remained);
		expect(wrapper.find(".timer__remained").text()).toMatch(keepTime);
	});
});
