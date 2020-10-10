<template>
	<div :class="classes">
		<div class="home__wrap">
			<home-time-info v-if="!hasStartTimer" />

			<home-timer
				v-if="hasStartTimer"
				:remained="remained.time"
				:remained-cycles="remained.cycles"
				:state-machine="sm"
			/>

			<div v-if="!hasStartTimer" class="home__controls">
				<base-button @click="handleClickSettings">
					{{ $t("actions.settings") }}
				</base-button>
				<base-button @click="handleClickStart">
					{{ $t("actions.start") }}
				</base-button>
			</div>

			<div v-if="hasStartTimer" class="home__controls">
				<base-button v-if="hasPauseTimer" @click="handleClickTogglePause">
					{{ $t("actions.resume") }}
				</base-button>
				<base-button v-else is-gray @click="handleClickTogglePause">
					{{ $t("actions.pause") }}
				</base-button>

				<base-button @click="handleClickStop">
					{{ $t("actions.stop") }}
				</base-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import BaseButton from "@/components/base-button/base-button.vue";
import { TimerStateMachine, State } from "@/libs/state-machine/timer/timer";
import { pages } from "@/router/pages";
import { AppState } from "@/store/store";

import HomeTimeInfo from "./components/home-time-info/home-time-info.vue";
import HomeTimer from "./components/home-timer/home-timer.vue";

const TIMER_CHECK_INTERVAL = 1_000;

export default defineComponent({
	name: "Home",

	components: {
		BaseButton,
		HomeTimeInfo,
		HomeTimer,
	},

	setup() {
		const router = useRouter();
		const store = useStore<AppState>();
		const { prepare, rest, work, cycles } = store.state;

		let intervalID: number | undefined;

		const sm = reactive(new TimerStateMachine());
		const remained = reactive({
			time: 0,
			cycles: 0,
		});

		const hasStartTimer = computed(() => sm.state !== State.init);
		const hasPauseTimer = computed(() => sm.state === State.pause);
		const classes = computed(() => ({
			home: true,
			home_start: sm.state !== State.init,
			home_work: sm.state === State.work,
			home_rest: sm.state === State.rest,
		}));

		function changeTimer(): void {
			remained.time -= 1;
			if (remained.time > 0) {
				return;
			}

			if (sm.state === State.work) {
				remained.time = rest;
				sm.transition(State.rest);
				return;
			}

			remained.time = work;
			remained.cycles -= 1;

			sm.transition(State.work);

			if (remained.cycles < 0) {
				resetTimer();
			}
		}

		function startTimer(): void {
			intervalID = setInterval(changeTimer, TIMER_CHECK_INTERVAL);
		}

		function stopTimer(): void {
			clearInterval(intervalID);
		}

		function resetTimer(): void {
			sm.reset();
			stopTimer();
		}

		const handleClickSettings = () => {
			sm.transition(State.init);
			router.push({ name: pages.settings });
		};
		const handleClickStart = () => {
			sm.transition(State.prepare);

			remained.time = prepare;
			remained.cycles = cycles;

			startTimer();
		};
		const handleClickTogglePause = () => {
			if (sm.state === State.pause) {
				sm.transition(sm.prevState);
				startTimer();
				return;
			}

			sm.transition(State.pause);
			stopTimer();
		};

		return {
			sm,
			remained,

			hasStartTimer,
			hasPauseTimer,
			classes,

			handleClickSettings,
			handleClickStart,
			handleClickStop: resetTimer,
			handleClickTogglePause,
		};
	},
});
</script>

<style>
.home {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: var(--transition-time);
}

.home_start {
	background: var(--screen-home-start);
}

.home_work {
	background: var(--screen-home-work);
}

.home_rest {
	background: var(--screen-home-rest);
}

.home__wrap {
	width: 100%;
	max-width: 500px;
	padding: var(--offset) var(--offset-small);
	box-sizing: border-box;
}

.home__controls {
	display: flex;
	flex-wrap: wrap;
	margin: 0 0 calc(-1 * var(--offset)) calc(-1 * var(--offset));
}

.home__controls > * {
	margin: 0 0 var(--offset) var(--offset);
	flex: 1 0 auto;
	width: calc(50% - var(--offset));
	min-width: 150px;
}

@media (max-width: 450px) {
	.home__wrap {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
}
</style>
