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

	it("watch quantity", async () => {
		const testValue = 20;

		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		wrapper.vm.quantity = testValue;
		await wrapper.setProps({});

		expect(wrapper.vm.oldValue).toBe(testValue);
		expect(wrapper.vm.quantity).toBe(testValue);
	});

	it("watch min props", async () => {
		const minValue = 3;

		const wrapper = mount(BaseInputNumber, {
			props: {
				modelValue: 2,
				min: 1,
			},
		});

		await wrapper.setProps({
			min: minValue,
		});

		expect(wrapper.vm.quantity).toBe(minValue);
	});

	it("watch max props", async () => {
		const maxValue = 9;

		const wrapper = mount(BaseInputNumber, {
			props: {
				modelValue: 10,
				max: 100,
			},
		});

		await wrapper.setProps({
			max: maxValue,
		});

		expect(wrapper.vm.quantity).toBe(maxValue);
	});

	it("increment", () => {
		const properties = {
			modelValue: 15,
			min: 10,
			max: 16,
		};

		const wrapper = mount(BaseInputNumber, {
			props: properties,
		});

		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(properties.modelValue + 1);

		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(properties.max);

		wrapper.vm.quantity = 0;
		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(properties.min);
	});

	it("decrement", () => {
		const properties = {
			modelValue: 15,
			min: 14,
		};

		const wrapper = mount(BaseInputNumber, {
			props: properties,
		});

		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(properties.modelValue - 1);

		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(properties.min);

		wrapper.vm.quantity = 0;
		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(properties.min);
	});

	it("method onBlur", () => {
		const properties = {
			min: 4,
			modelValue: 5,
			max: 6,
			step: 2,
		};

		const wrapper = mount(BaseInputNumber, {
			props: properties,
		});

		const input = wrapper.find("input").element;
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(properties.modelValue);

		wrapper.vm.quantity = properties.min - 10;
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(properties.min);

		wrapper.vm.quantity = properties.max + 10;
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(properties.max);

		wrapper.vm.quantity = "";
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(wrapper.vm.oldValue);
	});

	it("method onKeyup", () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		wrapper.trigger("keyup.up");
		expect(wrapper.vm.quantity).toEqual(defaultProps.modelValue);
	});

	it("key dot", () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		wrapper.trigger("keydown", { key: "." });
		expect(wrapper.vm.quantity).toEqual(defaultProps.modelValue);
	});

	it("key esc", () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		wrapper.trigger("keydown.esc");
		expect(wrapper.vm.quantity).toEqual(defaultProps.modelValue);
	});

	it("key right", () => {
		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		wrapper.trigger("keydown.right");
		expect(wrapper.vm.quantity).toEqual(defaultProps.modelValue);
	});

	it("check mounted", () => {
		const properties = {
			min: 2,
			modelValue: 1,
		};

		const wrapper = mount(BaseInputNumber, {
			props: properties,
		});

		expect(wrapper.vm.quantity).toEqual(properties.min);
	});
});
