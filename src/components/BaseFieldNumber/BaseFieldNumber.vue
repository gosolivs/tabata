<template>
	<label class="field">
		<span class="field__label">
			<slot />
		</span>

		<base-input-number
			v-model="value"
			:min="1"
			:step="1"
			:maxlength="10"
			class="field__input"
		/>
	</label>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from "vue";

import BaseInputNumber from "@/components/BaseInputNumber/BaseInputNumber.vue";

export default defineComponent({
	name: "BaseFieldNumber",

	components: {
		BaseInputNumber,
	},

	props: {
		modelValue: {
			type: Number,
			default: 0,
		},
	},

	setup(props, { emit }: SetupContext<["update:modelValue"]>) {
		const value = computed({
			get: () => props.modelValue,
			set: (value: number) => emit("update:modelValue", value),
		});

		return { value };
	},
});
</script>

<style>
.field {
	display: block;
}

.field__label {
	display: block;
	font-size: 14px;
	margin: 0 0 4px;
}

.field__input {
	border: none;
	border-bottom: 1px solid currentColor;
	font-size: 16px;
	display: block;
	box-sizing: border-box;
	padding: 3px 0;
	width: 100%;
	background: #fff;
	transition: 0.2s;
}

.field__input:focus {
	outline: none;
	background: #eee;
	border-bottom-color: #2196f3;
}
</style>
