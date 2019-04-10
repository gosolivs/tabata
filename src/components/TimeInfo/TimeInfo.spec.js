import { shallowMount } from "@vue/test-utils";

import TimeInfo from "@/components/TimeInfo/TimeInfo";
import { formatTime } from "@/utils/times";

const defaultProps = {
	prepare: 2,
	rest: 20,
	work: 30,
	cycles: 8,
};

describe("TimeInfo.vue", () => {
	it("props render", () => {
		const wrapper = shallowMount(TimeInfo, {
			propsData: defaultProps,
			mocks: {
				$t: value => value,
			},
		});

		const allItems = wrapper.findAll(".info__item");

		expect(allItems.at(0).text()).toMatch(`: ${defaultProps.prepare} `);
		expect(allItems.at(1).text()).toMatch(`: ${defaultProps.rest} `);
		expect(allItems.at(2).text()).toMatch(`: ${defaultProps.work} `);
		expect(allItems.at(3).text()).toMatch(`: ${defaultProps.cycles}`);
	});

	it("total time", () => {
		const { prepare, rest, work, cycles } = defaultProps;
		const totalTime = prepare + rest * cycles + work * cycles;

		const wrapper = shallowMount(TimeInfo, {
			propsData: defaultProps,
			mocks: {
				$t() {},
			},
		});

		expect(wrapper.find(".info__duration").text()).toEqual(
			formatTime(totalTime),
		);
	});
});
