import { mount } from "@vue/test-utils";

import { formatTime } from "@/libs/serializers/times/times";
import { TimerStateMachine } from "@/libs/state-machine/timer/timer";
import { locales } from "@/locales/locales";
import HomeTimer from "@/pages/home/components/home-timer/home-timer";
import { store } from "@/store/store";

const defaultProps = {
	remained: 20,
	remainedCycles: 5,
	cycles: 5,
	stateMachine: new TimerStateMachine(),
};

describe("HomeTimer.vue", () => {
	it("props render", () => {
		const wrapper = mount(HomeTimer, {
			props: defaultProps,
			global: {
				plugins: [locales, store],
			},
		});

		const keepTime = formatTime(defaultProps.remained);
		expect(wrapper.find(".home-timer__remained").text()).toMatch(keepTime);
	});
});
