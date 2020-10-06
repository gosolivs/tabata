<template>
	<input
		type="number"
		:maxlength="maxlength"
		autocomplete="off"
		v-model.number="quantity"
		@keyup="handleKeyup"
		@keydown="handleKeydown"
		@blur="handleBlur"
	/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "BaseInputNumber",

	props: {
		value: {
			type: Number,
			default: 0,
		},
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 10e10,
		},
		step: {
			type: Number,
			default: 1,
		},
		maxlength: {
			type: Number,
			default: 4,
		},
	},

	data: ({ value }) => ({
		quantity: value,
		oldValue: value,
		isKeydown: false,
	}),

	model: {
		prop: "value",
		event: "input",
	},

	watch: {
		quantity: function (): void {
			this.evaluateQuantity();
		},

		min: function (value: number): void {
			if (this.quantity < value) {
				this.quantity = value;
			}
		},

		max: function (value: number): void {
			if (this.quantity > value) {
				this.quantity = value;
			}
		},
	},

	mounted() {
		this.emitChange(true);
	},

	methods: {
		emitChange(init = false): void {
			this.oldValue = this.quantity;

			if (init) {
				this.quantity = this.value < this.min ? this.min : this.value;
			}

			this.$emit("input", this.quantity, init);
		},

		increment(): void {
			if (!this.quantity) {
				this.quantity = this.min;
			} else {
				this.quantity =
					this.quantity < this.max ? this.quantity + this.step : this.max;
			}
		},

		decrement(): void {
			if (!this.quantity) {
				this.quantity = this.min;
			} else {
				this.quantity =
					this.quantity > this.min ? this.quantity - this.step : this.min;
			}
		},

		evaluateQuantity(): void {
			if (this.isKeydown) {
				return;
			}

			if (
				this.quantity.toString().length > 0 &&
				this.quantity !== this.oldValue
			) {
				this.emitChange();
			}
		},

		handleBlur(): void {
			if (this.quantity.toString().length === 0) {
				this.quantity = this.oldValue;
				return;
			}

			if (this.quantity < this.min) {
				this.quantity = this.min;
			}

			if (this.quantity > this.max) {
				this.quantity = this.max;
			}
		},

		handleKeyup(): void {
			this.isKeydown = false;
			this.evaluateQuantity();
		},

		handleKeydown(event: KeyboardEvent): void {
			this.isKeydown = true;

			// Up key: Increase the value
			if (event.keyCode === 38) {
				this.increment();
				event.preventDefault();
				return;
			}

			// Down key: Decrease the value
			if (event.keyCode === 40) {
				this.decrement();
				event.preventDefault();
				return;
			}

			// Allow these keys only:
			if (
				// backspace, delete, tab, escape, enter
				[46, 8, 9, 27, 13].indexOf(event.keyCode) >= 0 ||
				// Ctrl/cmd+A
				(event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
				// Ctrl/cmd+C
				(event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
				// Ctrl/cmd+R
				(event.keyCode === 82 && (event.ctrlKey || event.metaKey)) ||
				// Ctrl/cmd+X
				(event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
				// home, end, left, right
				(event.keyCode >= 35 && event.keyCode <= 39)
			) {
				return;
			}

			if (
				event.keyCode === 110 ||
				event.keyCode === 190 ||
				((event.shiftKey || event.keyCode < 48 || event.keyCode > 57) &&
					(event.keyCode < 96 || event.keyCode > 105))
			) {
				event.preventDefault();
			}
		},
	},
});
</script>
