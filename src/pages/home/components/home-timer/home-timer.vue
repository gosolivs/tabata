<template>
	<div class="home-timer">
		<div class="home-timer__title">{{ title }}</div>
		<div class="home-timer__remained">{{ remainedFormatTime }}</div>
		<home-timer-cycles :keep="keepCycles" :total="cycles" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import { formatTime } from "@/libs/serializers/times/times";
import { TimerStateMachine, State } from "@/libs/state-machine/timer/timer";
import { useI18n } from "@/locales/locales";
import { AppState } from "@/store/store";

import HomeTimerCycles from "../home-timer-cycles/home-timer-cycles.vue";

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
		stateMachine: {
			type: TimerStateMachine,
			required: true,
		},
	},

	setup(properties) {
		const i18n = useI18n();
		const store = useStore<AppState>();

		const keepCycles = computed(
			() => store.state.cycles - properties.remainedCycles,
		);
		const remainedFormatTime = computed(() => formatTime(properties.remained));

		const title = computed(() => {
			switch (properties.stateMachine.state) {
				case State.prepare:
					return i18n.t("states.prepare");

				case State.work:
					return i18n.t("states.work");

				case State.rest:
					return i18n.t("states.rest");

				default:
					return i18n.t("states.pause");
			}
		});

		return {
			keepCycles,
			remainedFormatTime,
			title,
			cycles: store.state.cycles,
		};
	},
});
</script>

<style>
.home-timer {
}

.home-timer__title {
	font-size: 1.4rem;
	line-height: 1;
}

.home-timer__remained {
	font-size: 7rem;
	line-height: 1;
}

@media (max-width: 450px) {
	.home-timer {
		flex: 1 1 auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}

@media (max-width: 400px) {
	.home-timer__remained {
		font-size: 5rem;
	}
}
</style>
