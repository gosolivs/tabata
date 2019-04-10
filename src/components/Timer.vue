<template>
	<div class="timer">
		<div class="timer__title">{{ title }}</div>
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
		title: ({ paused, worked, rested }) => {
			switch (true) {
				case paused:
					return "Пауза";

				case worked:
					return "Работа";

				case rested:
					return "Отдых";

				default:
					return "Поготовка";
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
</style>
