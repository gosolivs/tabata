<template>
	<button :class="className" @click="onClick">
		<slot />
	</button>
</template>

<script>
export default {
	name: "BaseButton",

	computed: {
		className: ({ isGray }) => ({
			button: true,
			"button--gray": isGray,
		}),
	},

	props: {
		isGray: Boolean,
		onClick: {
			type: Function,
			required: true,
		},
	},
};
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
