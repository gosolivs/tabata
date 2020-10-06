<template>
	<div class="timer">
		<div class="timer__title">{{ $t(title) }}</div>
		<div class="timer__remained">{{ remainedFormatTime }}</div>
		<home-timer-cycles :keep="keepCycles" :total="cycles" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import HomeTimerCycles from "@/components/HomeTimerCycles/HomeTimerCycles.vue";
import { formatTime } from "@/filters/times/times";

export default defineComponent({
	name: "HomeTimer",

	components: {
		HomeTimerCycles,
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
		rested: {
			type: Boolean,
			default: false,
		},
		worked: {
			type: Boolean,
			default: false,
		},
		paused: {
			type: Boolean,
			default: false,
		},
	},

	setup(props) {
		return {
			keepCycles: computed(() => props.cycles - props.remainedCycles),
			remainedFormatTime: computed(() => formatTime(props.remained)),

			title: computed(() => {
				switch (true) {
					case props.paused:
						return "states.pause";

					case props.worked:
						return "states.work";

					case props.rested:
						return "states.rest";

					default:
						return "states.prepare";
				}
			}),
		};
	},
});
</script>

<style>
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
