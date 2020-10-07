<template>
	<div class="timer">
		<div class="timer__title">{{ title }}</div>
		<div class="timer__remained">{{ remainedFormatTime }}</div>
		<home-timer-cycles :keep="keepCycles" :total="cycles" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";

import HomeTimerCycles from "@/components/home-timer-cycles/home-timer-cycles.vue";
import { formatTime } from "@/libs/serializers/times/times";

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
		const i18n = useI18n();

		const keepCycles = computed(() => props.cycles - props.remainedCycles);
		const remainedFormatTime = computed(() => formatTime(props.remained));

		const title = computed(() => {
			switch (true) {
				case props.paused:
					return i18n.t("states.pause");

				case props.worked:
					return i18n.t("states.work");

				case props.rested:
					return i18n.t("states.rest");

				default:
					return i18n.t("states.prepare");
			}
		});

		return {
			keepCycles,
			remainedFormatTime,
			title,
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
