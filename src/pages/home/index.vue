<template>
	<div :class="classes">
		<div class="home__wrap">
			<home-time-info v-if="!hasStartTimer" />

			<home-timer
				v-if="hasStartTimer"
				:remained="remained"
				:remained-cycles="remainedCycles"
				:state-machine="sm"
			/>

			<div v-if="!hasStartTimer" class="home__controls">
				<base-button @click="clickSettings">
					{{ $t("actions.settings") }}
				</base-button>
				<base-button @click="clickStart">
					{{ $t("actions.start") }}
				</base-button>
			</div>

			<div v-if="hasStartTimer" class="home__controls">
				<base-button v-if="hasPauseTimer" @click="clickTogglePause">
					{{ $t("actions.resume") }}
				</base-button>
				<base-button v-else is-gray @click="clickTogglePause">
					{{ $t("actions.pause") }}
				</base-button>

				<base-button @click="clickStop">
					{{ $t("actions.stop") }}
				</base-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import BaseButton from "@/components/base-button/base-button.vue";
import { TimerStateMachine, State } from "@/libs/state-machine/timer/timer";
import { pages } from "@/router/pages";

import HomeTimeInfo from "./components/home-time-info/home-time-info.vue";
import HomeTimer from "./components/home-timer/home-timer.vue";

export default defineComponent({
	name: "Home",

	components: {
		BaseButton,
		HomeTimeInfo,
		HomeTimer,
	},

	data: () => ({
		sm: new TimerStateMachine(),

		remained: 0,
		remainedCycles: 0,

		intervalID: 0,
	}),

	computed: {
		...mapState(["prepare", "rest", "work", "cycles"]),

		hasStartTimer(): boolean {
			return this.sm.state !== State.init;
		},

		hasPauseTimer(): boolean {
			return this.sm.state === State.pause;
		},

		classes(): Record<string, boolean> {
			return {
				home: true,
				home_start: this.sm.state !== State.init,
				home_work: this.sm.state === State.work,
				home_rest: this.sm.state === State.rest,
			};
		},
	},

	methods: {
		clickSettings(): void {
			this.sm.transition(State.init);
			this.$router.push({ name: pages.settings });
		},

		clickStart(): void {
			this.sm.transition(State.prepare);

			this.remained = this.prepare;
			this.remainedCycles = this.cycles;

			this.intervalID = setInterval(this.changeTimer.bind(this), 1000);
		},

		clickStop(): void {
			this.sm.reset();
			clearInterval(this.intervalID);
		},

		clickTogglePause(): void {
			if (this.sm.state === State.pause) {
				this.sm.transition(this.sm.prevState);
				this.intervalID = setInterval(this.changeTimer.bind(this), 1000);
			} else {
				this.sm.transition(State.pause);
				clearInterval(this.intervalID);
			}
		},

		changeTimer(): void {
			this.remained -= 1;
			if (this.remained > 0) {
				return;
			}

			if (this.sm.state === State.work) {
				this.remained = this.rest;

				this.sm.transition(State.rest);
			} else {
				this.remained = this.work;
				this.remainedCycles -= 1;

				this.sm.transition(State.work);
			}

			if (this.remainedCycles < 0) {
				this.clickStop();
			}
		},
	},
});
</script>

<style>
.home {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.2s;
}

.home_start {
	background: #eee;
}

.home_work {
	background: #f99;
}

.home_rest {
	background: #50b98a;
}

.home__wrap {
	width: 100%;
	max-width: 500px;
	padding: 20px 15px;
	box-sizing: border-box;
}

.home__controls {
	display: flex;
	flex-wrap: wrap;
	margin: 0 0 -20px -20px;
}

.home__controls > * {
	margin: 0 0 20px 20px;
	flex: 1 0 auto;
	width: calc(50% - 20px);
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
