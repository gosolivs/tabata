<template>
	<div :class="classes">
		<div class="home__wrap">
			<home-time-info
				v-if="!started"
				:prepare="prepare"
				:rest="rest"
				:work="work"
				:cycles="cycles"
			/>

			<home-timer
				v-if="started"
				:remained="remained"
				:remainedCycles="remainedCycles"
				:cycles="cycles"
				:worked="worked"
				:rested="rested"
				:paused="paused"
			/>

			<div class="home__controls" v-if="!started">
				<base-button :onClick="clickSettings">{{
					$t("actions.settings")
				}}</base-button>
				<base-button :onClick="clickStart">{{
					$t("actions.start")
				}}</base-button>
			</div>

			<div class="home__controls" v-if="started">
				<base-button :onClick="clickTogglePause" isGray v-if="!paused">
					{{ $t("actions.pause") }}
				</base-button>
				<base-button :onClick="clickTogglePause" v-if="paused">
					{{ $t("actions.resume") }}
				</base-button>

				<base-button :onClick="clickStop">{{ $t("actions.stop") }}</base-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import { pages } from "@/router/pages";

import BaseButton from "@/components/BaseButton/BaseButton.vue";
import HomeTimeInfo from "@/components/HomeTimeInfo/HomeTimeInfo.vue";
import HomeTimer from "@/components/HomeTimer/HomeTimer.vue";

export default defineComponent({
	name: "Home",

	components: {
		BaseButton,
		HomeTimeInfo,
		HomeTimer,
	},

	data: () => ({
		started: false,
		paused: false,
		rested: false,
		worked: false,

		remained: 0,
		remainedCycles: 0,

		intervalID: 0,
	}),

	computed: {
		...mapState(["prepare", "rest", "work", "cycles"]),

		classes(): Record<string, boolean> {
			return {
				home: true,
				"home_start": this.started || this.paused,
				"home_work": this.started && !this.paused && this.worked,
				"home_rest": this.started && !this.paused && this.rested,
			};
		},
	},

	methods: {
		clickSettings(): void {
			this.started = false;
			this.paused = false;
			this.$router.push({ name: pages.settings });
		},

		clickStart(): void {
			this.started = true;
			this.paused = false;
			this.remained = this.prepare;
			this.remainedCycles = this.cycles;

			this.intervalID = setInterval(this.changeTimer.bind(this), 1000);
		},

		clickStop(): void {
			this.started = false;
			this.paused = false;
			this.worked = false;
			this.rested = false;
			clearInterval(this.intervalID);
		},

		clickTogglePause(): void {
			this.paused = !this.paused;

			if (!this.paused) {
				this.intervalID = setInterval(this.changeTimer.bind(this), 1000);
			} else {
				clearInterval(this.intervalID);
			}
		},

		changeTimer(): void {
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
