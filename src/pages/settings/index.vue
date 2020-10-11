<template>
	<div class="settings">
		<div class="settings__wrap">
			<h1 class="settings__title">{{ i18n.t("settings.title") }}</h1>

			<div class="settings__main">
				<base-field class="settings__field">
					<template #label>
						{{ i18n.t("states.prepare")
						}}<span class="settings__note">, {{ i18n.t("time_unit") }}</span>
					</template>
					<base-input-number v-model="prepare" />
				</base-field>

				<base-field class="settings__field">
					<template #label>
						{{ i18n.t("states.rest")
						}}<span class="settings__note">, {{ i18n.t("time_unit") }}</span>
					</template>
					<base-input-number v-model="rest" />
				</base-field>

				<base-field class="settings__field">
					<template #label>
						{{ i18n.t("states.work")
						}}<span class="settings__note">, {{ i18n.t("time_unit") }}</span>
					</template>
					<base-input-number v-model="work" />
				</base-field>

				<base-field class="settings__field">
					<template #label>{{ i18n.t("settings.cycles") }}</template>
					<base-input-number v-model="cycles" />
				</base-field>
			</div>

			<div class="settings__controls">
				<base-button is="a" :href="paths.home">
					{{ i18n.t("actions.close") }}
				</base-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import BaseButton from "@/components/base-button/base-button.vue";
import BaseField from "@/components/base-field/base-field.vue";
import BaseInputNumber from "@/components/base-input-number/base-input-number.vue";
import { useI18n } from "@/locales/locales";
import { paths } from "@/router/pages";
import { Actions, useStore } from "@/store/store";

export default defineComponent({
	name: "Settings",

	components: {
		BaseButton,
		BaseField,
		BaseInputNumber,
	},

	setup() {
		const store = useStore();
		const i18n = useI18n();

		const prepare = computed({
			get: () => store.state.prepare,
			set: (value: number) => store.dispatch(Actions.changePrepare, value),
		});

		const rest = computed({
			get: () => store.state.rest,
			set: (value: number) => store.dispatch(Actions.changeRest, value),
		});

		const work = computed({
			get: () => store.state.work,
			set: (value: number) => store.dispatch(Actions.changeWork, value),
		});

		const cycles = computed({
			get: () => store.state.cycles,
			set: (value: number) => store.dispatch(Actions.changeCycles, value),
		});

		return {
			i18n,

			paths,

			prepare,
			rest,
			work,
			cycles,
		};
	},
});
</script>

<style>
.settings {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.settings__wrap {
	width: 100%;
	max-width: 500px;
	padding: var(--offset) var(--offset-small);
	box-sizing: border-box;
}

.settings__title {
	margin: 0 0 var(--offset-small);
	padding: 0;
	font-weight: 500;
	font-size: 36px;
}

.settings__main {
	display: flex;
	flex-wrap: wrap;
	margin-left: calc(-1 * var(--offset));
}

.settings__field {
	margin: 0 0 var(--offset) var(--offset);
	flex: 1 1 auto;
	width: calc(50% - var(--offset));
	min-width: 180px;
}

.settings__note {
	color: var(--gray-color);
	font-size: 0.9em;
}

.settings__controls {
	margin-top: auto;
}

.settings__controls > * {
	width: 100%;
}

@media (max-width: 450px) {
	.settings__wrap {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
}
</style>
