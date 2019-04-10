import { shallowMount } from "@vue/test-utils";

import Field from "@/components/Field/Field";

const defaultProps = {
	value: 10,
};

describe("Field.vue", () => {
	it("label render", () => {
		const label = "text";

		const wrapper = shallowMount(Field, {
			propsData: defaultProps,
			slots: {
				default: label,
			},
		});

		expect(wrapper.find(".field__label").text()).toEqual(label);
	});

	it("onChange test", () => {
		const text = "hello";

		const wrapper = shallowMount(Field, {
			propsData: defaultProps,
		});

		wrapper.vm.$emit("input", text);
		expect(wrapper.emitted().input).toEqual([[text]]);
	});
});
