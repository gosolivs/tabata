<template>
	<div class="cycles">
		<div class="cycles__title">{{ title }}:</div>

		<span class="cycles__keep">{{ keep }}</span>
		<span class="cycles__total">/{{ total }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "HomeTimerCycles",

	props: {
		keep: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
	},

	setup() {
		const i18n = useI18n();

		const title = i18n.t("home.cycles");

		return { title };
	},
});
</script>

<style>
.cycles {
	margin: 20px 0;
}

.cycles__title {
	font-size: 1.4rem;
	margin-bottom: -0.4rem;
}

.cycles__keep {
	font-size: 4rem;
}

.cycles__total {
	font-size: 2.5rem;
	color: #444;
}
</style>
