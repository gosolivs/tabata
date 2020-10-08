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
			"base-button": true,
			"base-button_gray": properties.isGray,
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
.base-button {
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

.base-button:hover,
.base-button:focus {
	background: #1976d2;
}

.base-button:active {
	transition: 0s;
	filter: blur(2px);
}

.base-button_gray {
	background: #e0e0e0;
	color: #000;
}

.base-button_gray:hover,
.base-button_gray:focus {
	background: #d5d5d5;
}
</style>
