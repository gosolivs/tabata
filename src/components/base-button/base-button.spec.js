import { mount } from "@vue/test-utils";

import BaseButton from "@/components/base-button/base-button.vue";

describe("BaseButton.vue", () => {
	it("render with text", () => {
		const text = "message";
		const wrapper = mount(BaseButton, {
			slots: {
				default: text,
			},
		});

		expect(wrapper.text()).toEqual(text);
	});

	it("simple render", () => {
		const wrapper = mount(BaseButton);

		expect(wrapper.attributes().class).toMatch("button");
	});

	it("render gray button", () => {
		const wrapper = mount(BaseButton, {
			props: {
				isGray: true,
			},
		});

		expect(wrapper.attributes().class).toMatch("button_gray");
	});
});
