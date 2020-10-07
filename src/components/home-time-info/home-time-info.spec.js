import { mount } from "@vue/test-utils";

import HomeTimeInfo from "@/components/home-time-info/home-time-info";
import { formatTime } from "@/libs/serializers/times/times";
import { locales } from "@/locales/locales";

const defaultProps = {
	prepare: 2,
	rest: 20,
	work: 30,
	cycles: 8,
};

describe("HomeTimeInfo.vue", () => {
	it("props render", () => {
		const wrapper = mount(HomeTimeInfo, {
			props: defaultProps,
			global: {
				plugins: [locales],
			},
		});

		const allItems = wrapper.findAll(".info__item");

		expect(allItems[0].text()).toMatch(`: ${defaultProps.prepare} `);
		expect(allItems[1].text()).toMatch(`: ${defaultProps.rest} `);
		expect(allItems[2].text()).toMatch(`: ${defaultProps.work} `);
		expect(allItems[3].text()).toMatch(`: ${defaultProps.cycles}`);
	});

	it("total time", () => {
		const { prepare, rest, work, cycles } = defaultProps;
		const totalTime = prepare + rest * cycles + work * cycles;

		const wrapper = mount(HomeTimeInfo, {
			props: defaultProps,
			global: {
				plugins: [locales],
			},
		});

		expect(wrapper.find(".info__duration").text()).toEqual(
			formatTime(totalTime),
		);
	});
});
