<template>
	<label class="field">
		<span class="field__label">
			<slot />
		</span>

		<base-input-number
			:min="1"
			:step="1"
			:maxlength="10"
			:value="value"
			@input="onInput"
			class="field__input"
		/>
	</label>
</template>

<script>
import BaseInputNumber from "@/components/BaseInputNumber/BaseInputNumber";

export default {
	name: "BaseFieldNumber",

	components: {
		BaseInputNumber,
	},

	methods: {
		onInput(value) {
			this.$emit("input", value);
		},
	},

	props: {
		value: {
			type: Number,
			required: true,
		},
	},
};
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
