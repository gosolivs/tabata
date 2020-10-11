import { mount } from "@vue/test-utils";

import BaseInputNumber from "@/components/base-input-number/base-input-number";

const defaultProps = {
	modelValue: 10,
};

describe("BaseInputNumber.vue", () => {
	it("check default attributes", () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		const attributes = wrapper.find("input").attributes();
		expect(attributes.type).toEqual("number");
		expect(attributes.autocomplete).toEqual("off");
	});

	it("increment", async () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		await wrapper.trigger("keydown.up");

		expect(wrapper.emitted("update:modelValue")).toEqual([
			[defaultProps.modelValue + 1],
		]);
	});

	it("decrement", async () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		await wrapper.trigger("keydown.down");

		expect(wrapper.emitted("update:modelValue")).toEqual([
			[defaultProps.modelValue - 1],
		]);
	});

	it("method handleBlur", async () => {
		const value = 322;

		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		const input = wrapper.find("input").element;
		await wrapper.setProps({ modelValue: value });
		input.blur();

		expect(input.value).toEqual(value.toString());
	});

	it("key dot", async () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		await wrapper.trigger("keydown", { key: "." });

		expect(wrapper.emitted()).toEqual({});
	});

	it("key esc", async () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		await wrapper.trigger("keydown.esc");

		expect(wrapper.emitted()).toEqual({});
	});

	it("key right", async () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		await wrapper.trigger("keydown.right");

		expect(wrapper.emitted()).toEqual({});
	});
});
