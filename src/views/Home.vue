<template>
	<div :class="rootClassName">
		<div class="home__wrap">
			<TimeInfo
				v-if="!started"
				:prepare="prepare"
				:rest="rest"
				:work="work"
				:cycles="cycles"
			/>

			<Timer
				v-if="started"
				:remained="remained"
				:remainedCycles="remainedCycles"
				:cycles="cycles"
				:worked="worked"
				:rested="rested"
				:paused="paused"
			/>

			<div class="home__controls" v-if="!started">
				<Button :onClick="clickSettings">{{ $t("actions.settings") }}</Button>
				<Button :onClick="clickStart">{{ $t("actions.start") }}</Button>
			</div>

			<div class="home__controls" v-if="started">
				<Button :onClick="clickTogglePause" isGray v-if="!paused">{{
					$t("actions.pause")
				}}</Button>
				<Button :onClick="clickTogglePause" v-if="paused">{{
					$t("actions.resume")
				}}</Button>

				<Button :onClick="clickStop">{{ $t("actions.stop") }}</Button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

import router from "@/router";
import routeName from "@/router/routeName";

import Button from "@/components/Button";
import TimeInfo from "@/components/TimeInfo";
import Timer from "@/components/Timer";

let intervalID;

export default {
	name: "Home",

	components: {
		Button,
		TimeInfo,
		Timer,
	},

	data: () => ({
		started: false,
		paused: false,
		rested: false,
		worked: false,

		remained: 0,
		remainedCycles: 0,
	}),

	computed: {
		...mapState({
			prepare: state => state.prepare,
			rest: state => state.rest,
			work: state => state.work,
			cycles: state => state.cycles,
		}),

		rootClassName: ({ started, paused, rested, worked }) => ({
			home: true,
			"home--start": started || paused,
			"home--work": started && !paused && worked,
			"home--rest": started && !paused && rested,
		}),
	},

	methods: {
		clickSettings() {
			this.started = false;
			this.paused = false;
			router.push({ name: routeName.settings });
		},

		clickStart() {
			this.started = true;
			this.paused = false;
			this.remained = this.prepare;
			this.remainedCycles = this.cycles;

			intervalID = setInterval(this.changeTimer.bind(this), 1000);
		},

		clickStop() {
			this.started = false;
			this.paused = false;
			this.worked = false;
			this.rested = false;
			clearInterval(intervalID);
		},

		clickTogglePause() {
			this.paused = !this.paused;

			if (!this.paused) {
				intervalID = setInterval(this.changeTimer.bind(this), 1000);
			} else {
				clearInterval(intervalID);
			}
		},

		changeTimer() {
			this.remained -= 1;

			if (this.remained === 0) {
				if (this.worked) {
					this.remained = this.rest;

					this.rested = true;
					this.worked = false;
				} else {
					this.remained = this.work;
					this.remainedCycles -= 1;

					this.rested = false;
					this.worked = true;
				}
			}

			if (this.remainedCycles < 0) {
				this.clickStop();
			}
		},
	},
};
</script>

<style scoped>
.home {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.2s;
}

.home--start {
	background: #eee;
}

.home--work {
	background: #f99;
}

.home--rest {
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
