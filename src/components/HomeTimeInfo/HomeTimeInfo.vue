<template>
	<div class="info">
		<ul class="info__list">
			<li class="info__item">
				{{ $t("states.prepare") }}: {{ prepare }} {{ $t("time_unit") }}
			</li>
			<li class="info__item">
				{{ $t("states.rest") }}: {{ rest }} {{ $t("time_unit") }}
			</li>
			<li class="info__item">
				{{ $t("states.work") }}: {{ work }} {{ $t("time_unit") }}
			</li>
			<li class="info__item">{{ $t("settings.cycles") }}: {{ cycles }}</li>
		</ul>

		<div class="info__total">
			{{ $t("home.total_time") }}:
			<div class="info__duration">{{ total | formatTime }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "HomeTimeInfo",

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

@media (max-width: 450px) {
	.info {
		flex: 1 1 auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>
