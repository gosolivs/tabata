<template>
	<div class="info">
		<ul class="info__list">
			<li class="info__item">Подготовка: {{ prepare }} сек.</li>
			<li class="info__item">Отдых: {{ rest }} сек.</li>
			<li class="info__item">Работа: {{ work }} сек.</li>
			<li class="info__item">Кругов: {{ cycles }}</li>
		</ul>

		<div class="info__total">
			Общее время:
			<div class="info__duration">{{ keepTime }}</div>
		</div>
	</div>
</template>

<script>
import { formatTime } from "@/utils/times";

export default {
	name: "TimeInfo",

	props: {
		prepare: {
			type: Number,
			required: true,
		},
		rest: {
			type: Number,
			required: true,
		},
		work: {
			type: Number,
			required: true,
		},
		cycles: {
			type: Number,
			required: true,
		},
	},

	computed: {
		total: ({ prepare, rest, work, cycles }) =>
			prepare + rest * cycles + work * cycles,
		keepTime: ({ total }) => formatTime(total),
	},
};
</script>

<style scoped>
.info {
}

.info__list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.info__item {
	margin: 0 0 5px;
}

.info__total {
	margin: 20px 0;
	font-size: 1.4rem;
}

.info__duration {
	line-height: 1;
	font-size: 5rem;
}
</style>
