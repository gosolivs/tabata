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

		const attrs = wrapper.find("input").attributes();
		expect(attrs.type).toEqual("number");
		expect(attrs.autocomplete).toEqual("off");
	});

	it("watch quantity", async () => {
		const newValue = 20;

		const wrapper = mount(BaseInputNumber, {
			props: defaultProps,
		});

		wrapper.vm.quantity = newValue;
		await wrapper.setProps({});

		expect(wrapper.vm.oldValue).toBe(newValue);
		expect(wrapper.vm.quantity).toBe(newValue);
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
		const props = {
			modelValue: 15,
			min: 10,
			max: 16,
		};

		const wrapper = mount(BaseInputNumber, {
			props: props,
		});

		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(props.modelValue + 1);

		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(props.max);

		wrapper.vm.quantity = 0;
		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(props.min);
	});

	it("decrement", () => {
		const props = {
			modelValue: 15,
			min: 14,
		};

		const wrapper = mount(BaseInputNumber, {
			props: props,
		});

		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(props.modelValue - 1);

		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(props.min);

		wrapper.vm.quantity = 0;
		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(props.min);
	});

	it("method onBlur", () => {
		const props = {
			min: 4,
			modelValue: 5,
			max: 6,
			step: 2,
		};

		const wrapper = mount(BaseInputNumber, {
			props: props,
		});

		const input = wrapper.find("input").element;
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(props.modelValue);

		wrapper.vm.quantity = props.min - 10;
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(props.min);

		wrapper.vm.quantity = props.max + 10;
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(props.max);

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
		const props = {
			min: 2,
			modelValue: 1,
		};

		const wrapper = mount(BaseInputNumber, {
			props: props,
		});

		expect(wrapper.vm.quantity).toEqual(props.min);
	});
});
