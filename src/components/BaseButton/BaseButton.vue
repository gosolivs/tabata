<template>
	<button :class="classes" @click="onClick">
		<slot />
	</button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
	name: "BaseButton",

	props: {
		isGray: {
			type: Boolean,
			default: false,
		},
		onClick: {
			type: Function,
			required: true,
		},
	},

	setup(props) {
		return {
			classes: computed(() => ({
				button: true,
				"button--gray": props.isGray,
			})),
		};
	},
});
</script>

<style>
.button {
	border: none;
	border-radius: 0;
	text-decoration: none;
	background: #2196f3;
	color: #fff;
	text-align: center;
	display: inline-block;
	padding: 10px;
	transition: 0.2s;
	font-size: 14px;
}

.button:hover,
.button:focus {
	background: #1976d2;
}

.button:active {
	transition: 0s;
	filter: blur(2px);
}

.button--gray {
	background: #e0e0e0;
	color: #000;
}

.button--gray:hover,
.button--gray:focus {
	background: #d5d5d5;
}
</style>
