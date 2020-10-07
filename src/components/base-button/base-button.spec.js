import { shallowMount } from "@vue/test-utils";

import BaseButton from "@/components/base-button/base-button.vue";

describe("BaseButton.vue", () => {
	it("render with text", () => {
		const text = "message";
		const wrapper = shallowMount(BaseButton, {
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
		const wrapper = shallowMount(BaseButton, {
			propsData: {
				onClick: () => {},
			},
		});

		expect(wrapper.attributes().class).toMatch("button");
	});

	it("render gray button", () => {
		const wrapper = shallowMount(BaseButton, {
			propsData: {
				isGray: true,
				onClick: () => {},
			},
		});

		expect(wrapper.attributes().class).toMatch("button_gray");
	});
});
