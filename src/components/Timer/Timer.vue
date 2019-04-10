<template>
	<div class="timer">
		<div class="timer__title">{{ $t(title) }}</div>
		<div class="timer__remained">{{ remained | formatTime }}</div>
		<Cycles :keep="keepCycles" :total="cycles" />
	</div>
</template>

<script>
import Cycles from "@/components/Cycles/Cycles";

export default {
	name: "Timer",

	components: {
		Cycles,
	},

	props: {
		remained: {
			type: Number,
			required: true,
		},
		remainedCycles: {
			type: Number,
			required: true,
		},
		cycles: {
			type: Number,
			required: true,
		},
		rested: Boolean,
		worked: Boolean,
		paused: Boolean,
	},

	computed: {
		keepCycles: ({ remainedCycles, cycles }) => cycles - remainedCycles,
		title: ({ paused, worked, rested }) => {
			switch (true) {
				case paused:
					return "states.pause";

				case worked:
					return "states.work";

				case rested:
					return "states.rest";

				default:
					return "states.prepare";
			}
		},
	},
};
</script>

<style scoped>
.timer {
}

.timer__title {
	font-size: 1.4rem;
	line-height: 1;
}

.timer__remained {
	font-size: 7rem;
	line-height: 1;
}

@media (max-width: 450px) {
	.timer {
		flex: 1 1 auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}

@media (max-width: 400px) {
	.timer__remained {
		font-size: 5rem;
	}
}
</style>
