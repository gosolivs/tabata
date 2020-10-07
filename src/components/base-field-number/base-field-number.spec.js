import { mount } from "@vue/test-utils";

import BaseFieldNumber from "@/components/base-field-number/base-field-number";

const defaultProps = {
	value: 10,
};

describe("BaseFieldNumber.vue", () => {
	it("label render", () => {
		const label = "text";

		const wrapper = mount(BaseFieldNumber, {
			props: defaultProps,
			slots: {
				default: label,
			},
		});

		expect(wrapper.find(".field__label").text()).toEqual(label);
	});
});
