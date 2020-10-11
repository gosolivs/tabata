<template>
	<input
		ref="input"
		:value="modelValue"
		type="number"
		autocomplete="off"
		class="base-input-number"
		@input="handleInput"
		@keydown="handleKeydown"
		@blur="handleBlur"
	/>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from "vue";

const STEP = 1;

export default defineComponent({
	name: "BaseInputNumber",

	props: {
		modelValue: {
			type: Number,
			default: 0,
		},
	},

	emits: ["update:modelValue"],

	setup(properties, { emit }: SetupContext<["update:modelValue"]>) {
		const input = ref<HTMLInputElement | null>(null);

		const fireUpdate = (value: number): void =>
			emit("update:modelValue", value);

		const increment = (): void => fireUpdate(properties.modelValue + STEP);
		const decrement = (): void => fireUpdate(properties.modelValue - STEP);

		function handleInput(event: { target: { value: string } }): void {
			const raw = /\d+/.exec(event.target.value);
			if (raw === null) {
				return;
			}

			fireUpdate(Number.parseInt(raw[0], 10));
		}

		function handleKeydown(event: KeyboardEvent): void {
			const key = event.key.toLowerCase();

			// Up key: Increase the value
			if (key === "arrowup" || key === "up") {
				increment();
				event.preventDefault();
				return;
			}

			// Down key: Decrease the value
			if (key === "arrowdown" || key === "down") {
				decrement();
				event.preventDefault();
				return;
			}

			// Disable "e" key
			if (key === "e" && !event.ctrlKey && !event.altKey && !event.metaKey) {
				event.preventDefault();
			}
		}

		function handleBlur(): void {
			if (input.value === null) {
				return;
			}

			input.value.value = properties.modelValue.toString();
		}

		return {
			input,

			handleInput,
			handleKeydown,
			handleBlur,
		};
	},
});
</script>

<style>
.base-input-number {
	border: none;
	border-bottom: 1px solid currentColor;
	font-size: 16px;
	display: block;
	box-sizing: border-box;
	padding: 3px 0;
	width: 100%;
	background: var(--input-background-color);
	color: var(--input-text-color);
	transition: var(--transition-time);
}

.base-input-number:focus {
	outline: none;
	background: var(--input-background-focus-color);
	border-bottom-color: var(--brand-color);
}
</style>
