<template>
	<div class="settings">
		<div class="settings__wrap">
			<h1 class="settings__title">{{ $t("settings.title") }}</h1>

			<div class="settings__main">
				<div class="settings__field">
					<base-field-number v-model="prepare">
						{{ $t("states.prepare")
						}}<span class="settings__note">, {{ $t("time_unit") }}</span>
					</base-field-number>
				</div>

				<div class="settings__field">
					<base-field-number v-model="rest">
						{{ $t("states.rest")
						}}<span class="settings__note">, {{ $t("time_unit") }}</span>
					</base-field-number>
				</div>

				<div class="settings__field">
					<base-field-number v-model="work">
						{{ $t("states.work")
						}}<span class="settings__note">, {{ $t("time_unit") }}</span>
					</base-field-number>
				</div>

				<div class="settings__field">
					<base-field-number v-model="cycles">
						{{ $t("settings.cycles") }}
					</base-field-number>
				</div>
			</div>

			<div class="settings__controls">
				<base-button @click="handleSave">{{ $t("actions.close") }}</base-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import {
	CHANGE_PREPARE,
	CHANGE_REST,
	CHANGE_WORK,
	CHANGE_CYCLES,
} from "@/store/actions.type";
import { State } from "@/store";

import { pages } from "@/router/pages";

import BaseButton from "@/components/BaseButton/BaseButton.vue";
import BaseFieldNumber from "@/components/BaseFieldNumber/BaseFieldNumber.vue";

export default defineComponent({
	name: "Settings",

	components: {
		BaseButton,
		BaseFieldNumber,
	},

	setup() {
		const store = useStore<State>();
		const router = useRouter();

		const prepare = computed({
			get: () => store.state.prepare,
			set: (value: number) => store.commit(CHANGE_PREPARE, value),
		});

		const rest = computed({
			get: () => store.state.rest,
			set: (value: number) => store.commit(CHANGE_REST, value),
		});

		const work = computed({
			get: () => store.state.work,
			set: (value: number) => store.commit(CHANGE_WORK, value),
		});

		const cycles = computed({
			get: () => store.state.cycles,
			set: (value: number) => store.commit(CHANGE_CYCLES, value),
		});

		const handleSave = () => router.push({ name: pages.home });

		return {
			prepare,
			rest,
			work,
			cycles,
			handleSave,
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
	padding: 20px 15px;
	box-sizing: border-box;
}

.settings__title {
	margin: 0 0 15px;
	padding: 0;
	font-weight: 500;
	font-size: 36px;
}

.settings__main {
	display: flex;
	flex-wrap: wrap;
	margin-left: -20px;
}

.settings__field {
	margin: 0 0 20px 20px;
	flex: 1 1 auto;
	width: calc(50% - 20px);
	min-width: 180px;
}

.settings__note {
	color: #333;
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
