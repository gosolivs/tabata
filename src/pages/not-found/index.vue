<template>
	<div class="not-found">
		<div class="not-found__wrap">
			<h1 class="not-found__header">{{ i18n.t("notFound.title") }}</h1>
			<a href="/">{{ i18n.t("notFound.goToHome") }}</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useI18n } from "@/locales/locales";

export default defineComponent({
	setup() {
		const i18n = useI18n();

		return { i18n };
	},
});
</script>

<style>
.not-found {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: var(--transition-time);
}

.not-found__wrap {
	width: 100%;
	max-width: 500px;
	padding: var(--offset) var(--offset-small);
	margin: 0 auto;
	box-sizing: border-box;
	text-align: center;
}

.not-found__header {
	font-size: 4rem;
	font-weight: 400;
	line-height: 1;
	padding: 0;
	margin: 0 0 0.5em;
}
</style>
