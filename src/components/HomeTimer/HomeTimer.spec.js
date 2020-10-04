import { shallowMount } from "@vue/test-utils";

import HomeTimer from "@/components/HomeTimer/HomeTimer";
import { formatTime } from "@/filters/times/times";

const defaultProps = {
	remained: 20,
	remainedCycles: 5,
	cycles: 5,
};

const mocks = {
	$t: (value) => value,
};

describe("HomeTimer.vue", () => {
	it("props render", () => {
		const wrapper = shallowMount(HomeTimer, {
			propsData: defaultProps,
			mocks,
		});

		const keepTime = formatTime(defaultProps.remained);
		expect(wrapper.find(".timer__remained").text()).toMatch(keepTime);
	});

	it("paused state", () => {
		const wrapper = shallowMount(HomeTimer, {
			propsData: Object.assign({}, defaultProps, {
				paused: true,
			}),
			mocks,
		});

		expect(wrapper.find(".timer__title").text()).toEqual("states.pause");
	});

	it("rest state", () => {
		const wrapper = shallowMount(HomeTimer, {
			propsData: Object.assign({}, defaultProps, {
				rested: true,
			}),
			mocks,
		});

		expect(wrapper.find(".timer__title").text()).toEqual("states.rest");
	});

	it("worked state", () => {
		const wrapper = shallowMount(HomeTimer, {
			propsData: Object.assign({}, defaultProps, {
				worked: true,
			}),
			mocks,
		});

		expect(wrapper.find(".timer__title").text()).toEqual("states.work");
	});

	it("default state", () => {
		const wrapper = shallowMount(HomeTimer, {
			propsData: defaultProps,
			mocks,
		});

		expect(wrapper.find(".timer__title").text()).toEqual("states.prepare");
	});
});
