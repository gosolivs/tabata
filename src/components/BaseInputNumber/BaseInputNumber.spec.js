import { shallowMount } from "@vue/test-utils";

import BaseInputNumber from "@/components/BaseInputNumber/BaseInputNumber";

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

	it("check prop min", () => {
		const defaultProps = {
			min: 1,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		expect(wrapper.vm.min).toBe(defaultProps.min);
	});

	it("check prop max", () => {
		const defaultProps = {
			max: 1,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		expect(wrapper.vm.max).toBe(defaultProps.max);
	});

	it("check prop step", () => {
		const defaultProps = {
			step: 1,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		expect(wrapper.vm.step).toBe(defaultProps.step);
	});

	it("check prop maxlength", () => {
		const defaultProps = {
			maxlength: 1,
		};

		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		expect(wrapper.vm.maxlength).toBe(defaultProps.maxlength);
	});

	it("default value", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("increment", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.trigger("keydown.up");
		expect(wrapper.vm.quantity).toEqual(defaultProps.value + 1);
	});

	it("decrement", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.trigger("keydown.down");
		expect(wrapper.vm.quantity).toEqual(defaultProps.value - 1);
	});

	it("dot", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.trigger("keydown", { key: "." });
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("esc key", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.trigger("keydown.esc");
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("onKeyup method", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.onKeyup();
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("evaluateQuantity method", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.evaluateQuantity();
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("onBlur method", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		// todo !!
		wrapper.vm.onBlur();
		expect(wrapper.vm.quantity).toEqual(defaultProps.value);
	});

	it("increment method", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.increment();
		expect(wrapper.vm.quantity).toEqual(defaultProps.value + 1);
	});

	it("decrement method", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.decrement();
		expect(wrapper.vm.quantity).toEqual(defaultProps.value - 1);
	});

	it("emitChange method", () => {
		const wrapper = shallowMount(BaseInputNumber, {
			propsData: defaultProps,
		});

		wrapper.vm.emitChange();
		expect(wrapper.emitted().input).toEqual([
			[defaultProps.value, true],
			[defaultProps.value, false],
		]);
	});
});
