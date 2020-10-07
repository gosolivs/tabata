import { shallowMount } from "@vue/test-utils";

import BaseFieldNumber from "@/components/base-field-number/base-field-number";

const defaultProps = {
	value: 10,
};

describe("BaseFieldNumber.vue", () => {
	it("label render", () => {
		const label = "text";

		const wrapper = shallowMount(BaseFieldNumber, {
			propsData: defaultProps,
			slots: {
				default: label,
			},
		});

		expect(wrapper.find(".field__label").text()).toEqual(label);
	});

	it("onChange test", () => {
		const text = "hello";

		const wrapper = shallowMount(BaseFieldNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.onInput(text);
		expect(wrapper.emitted().input).toEqual([[text]]);
	});
});
