import { shallowMount } from "@vue/test-utils";

import Button from "@/components/Button/Button.vue";

describe("Button.vue", () => {
	it("render with text", () => {
		const text = "message";
		const wrapper = shallowMount(Button, {
			propsData: {
				onClick: () => {},
			},
			slots: {
				default: text,
			},
		});

		expect(wrapper.text()).toEqual(text);
	});

	it("simple render", () => {
		const wrapper = shallowMount(Button, {
			propsData: {
				onClick: () => {},
			},
		});

		expect(wrapper.attributes().class).toMatch("button");
	});

	it("render gray button", () => {
		const wrapper = shallowMount(Button, {
			propsData: {
				isGray: true,
				onClick: () => {},
			},
		});

		expect(wrapper.attributes().class).toMatch("button--gray");
	});
});
