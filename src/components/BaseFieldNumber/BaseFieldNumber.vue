<template>
	<label class="field">
		<span class="field__label"><slot /></span>
		<input-number
			:min="1"
			:max="999"
			:step="1"
			:maxlength="3"
			:value="value"
			@onInputNumberChange="onChange"
			pattern="\d+"
			type="number"
		/>
	</label>
</template>

<script>
import InputNumber from "vue-input-number/index.vue";

export default {
	name: "BaseFieldNumber",

	components: {
		InputNumber,
	},

	methods: {
		onChange(value) {
			this.$emit("input", value);
		},
	},

	props: {
		value: {
			required: true,
		},
	},
};
</script>

<style scoped>
.field {
	display: block;
}

.field__label {
	display: block;
	font-size: 14px;
	margin: 0 0 4px;
}

.field :global(.v-input-number-input) {
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

.field :global(.v-input-number-input):focus {
	outline: none;
	background: #eee;
	border-bottom-color: #2196f3;
}
</style>
