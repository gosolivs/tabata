<template>
	<button :class="classes" @click="handleClick">
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
	},

	emits: ["click"],

	setup(properties, { emit }) {
		const classes = computed(() => ({
			button: true,
			button_gray: properties.isGray,
		}));

		const handleClick = () => emit("click");

		return {
			classes,
			handleClick,
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

.button_gray {
	background: #e0e0e0;
	color: #000;
}

.button_gray:hover,
.button_gray:focus {
	background: #d5d5d5;
}
</style>
