import { mount } from "@vue/test-utils";

import BaseField from "@/components/base-field/base-field";

describe("BaseField.vue", () => {
	it("label render", () => {
		const label = "text";

		const wrapper = mount(BaseField, {
			slots: {
				default: label,
			},
		});

		expect(wrapper.find(".base-field__label").text()).toEqual(label);
	});
});
