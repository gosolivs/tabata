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
	background: var(--brand-color);
	color: var(--brand-text-color);
	text-align: center;
	display: inline-block;
	padding: 10px;
	transition: var(--transition-time);
	font-size: 14px;
	cursor: pointer;
}

.base-button:hover,
.base-button:focus {
	background: var(--brand-darken-color);
}

.base-button:active {
	transition: 0s;
	filter: blur(2px);
}

.base-button_gray {
	background: var(--second-color);
	color: var(--second-text-color);
}

.base-button_gray:hover,
.base-button_gray:focus {
	background: var(--second-darken-color);
}
</style>
