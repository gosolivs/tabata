<template>
	<div class="timer">
		<div class="timer__title" v-if="!paused && !rested && !worked">
			Поготовка
		</div>
		<div class="timer__title" v-if="!paused && rested">Отдых</div>
		<div class="timer__title" v-if="!paused && worked">Работа</div>
		<div class="timer__title" v-if="paused">Пауза</div>

		<div class="timer__remained">{{ keepTime }}</div>

		<Cycles :keep="keepCycles" :total="cycles" />
	</div>
</template>

<script>
import { formatTime } from "@/utils/times";

import Cycles from "@/components/Cycles";

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
		keepTime: ({ remained }) => formatTime(remained),
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
</style>
