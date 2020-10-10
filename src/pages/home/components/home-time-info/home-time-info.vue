<template>
	<div class="home-time-info">
		<ul class="home-time-info__list">
			<li class="home-time-info__item">
				{{ i18n.t("states.prepare") }}: {{ state.prepare }}
				{{ i18n.t("time_unit") }}
			</li>
			<li class="home-time-info__item">
				{{ i18n.t("states.rest") }}: {{ state.rest }} {{ i18n.t("time_unit") }}
			</li>
			<li class="home-time-info__item">
				{{ i18n.t("states.work") }}: {{ state.work }} {{ i18n.t("time_unit") }}
			</li>
			<li class="home-time-info__item">
				{{ i18n.t("settings.cycles") }}: {{ state.cycles }}
			</li>
		</ul>

		<div class="home-time-info__total">
			{{ i18n.t("home.total_time") }}:
			<div class="home-time-info__duration">{{ totalFormatTime }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import { formatTime } from "@/libs/serializers/times/times";
import { useI18n } from "@/locales/locales";
import { AppState } from "@/store/store";

export default defineComponent({
	name: "HomeTimeInfo",

	setup() {
		const store = useStore<AppState>();
		const i18n = useI18n();

		const total = computed(
			() =>
				store.state.prepare +
				store.state.rest * store.state.cycles +
				store.state.work * store.state.cycles,
		);

		const totalFormatTime = computed(() => formatTime(total.value));

		return {
			i18n,
			total,
			totalFormatTime,
			state: store.state,
		};
	},
});
</script>

<style>
.home-time-info {
}

.home-time-info__list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.home-time-info__item {
	margin: 0 0 5px;
}

.home-time-info__total {
	margin: var(--offset) 0;
	font-size: 1.4rem;
}

.home-time-info__duration {
	line-height: 1;
	font-size: 5rem;
}

@media (max-width: 450px) {
	.home-time-info {
		flex: 1 1 auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>
