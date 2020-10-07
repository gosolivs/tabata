import { shallowMount } from "@vue/test-utils";

import BaseInputNumber from "@/components/base-input-number/base-input-number";

const defaultProps = {
	value: 10,
};

describe("BaseInputNumber.vue", () => {
	it("check default attributes", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		const attrs = wrapper.find("input").attributes();
		expect(attrs.type).toEqual("number");
		expect(attrs.autocomplete).toEqual("off");
	});

	it("watch quantity", () => {
		const newValue = 20;

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.quantity = newValue;
		expect(wrapper.vm.oldValue).toBe(newValue);
		expect(wrapper.vm.quantity).toBe(newValue);
	});

	it("watch min props", () => {
		const minValue = 3;

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: {
				value: 2,
				min: 1,
			},
		});

		wrapper.setProps({
			min: minValue,
		});

		expect(wrapper.vm.quantity).toBe(minValue);
	});

	it("watch max props", () => {
		const manValue = 9;

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: {
				value: 10,
				man: 100,
			},
		});

		wrapper.setProps({
			max: manValue,
		});

		expect(wrapper.vm.quantity).toBe(manValue);
	});

	it("increment", () => {
		const props = {
			value: 15,
			min: 10,
			max: 16,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: props,
		});

		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(props.value + 1);

		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(props.max);

		wrapper.vm.quantity = 0;
		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(props.min);
	});

	it("decrement", () => {
		const props = {
			value: 15,
			min: 14,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: props,
		});

		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(props.value - 1);

		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(props.min);

		wrapper.vm.quantity = 0;
		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(props.min);
	});

	it("method onBlur", () => {
		const props = {
			min: 4,
			value: 5,
			max: 6,
			step: 2,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: props,
		});

		const input = wrapper.find("input").element;
		input.focus();
		input.blur();
		expect(wrapper.vm.quantity).toEqual(props.value);

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
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.onKeyup();
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("key dot", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.trigger("keydown", { key: "." });
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("key esc", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.trigger("keydown.esc");
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("key right", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.trigger("keydown.right");
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("check mounted", () => {
		const props = {
			min: 2,
			value: 1,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: props,
		});

		expect(wrapper.vm.quantity).toEqual(props.min);
	});
});
