<template>
	<div class="settings">
		<div class="settings__wrap">
			<h1 class="settings__title">{{ $t("settings.title") }}</h1>

			<div class="settings__main">
				<div class="settings__field">
					<base-field-number :value="prepare" @input="updatePrepare">
						{{ $t("states.prepare")
						}}<span class="settings__note">, {{ $t("time_unit") }}</span>
					</base-field-number>
				</div>

				<div class="settings__field">
					<base-field-number :value="rest" @input="updateRest">
						{{ $t("states.rest")
						}}<span class="settings__note">, {{ $t("time_unit") }}</span>
					</base-field-number>
				</div>

				<div class="settings__field">
					<base-field-number :value="work" @input="updateWork">
						{{ $t("states.work")
						}}<span class="settings__note">, {{ $t("time_unit") }}</span>
					</base-field-number>
				</div>

				<div class="settings__field">
					<base-field-number :value="cycles" @input="updateCycles">
						{{ $t("settings.cycles") }}
					</base-field-number>
				</div>
			</div>

			<div class="settings__controls">
				<base-button :onClick="save">{{ $t("actions.close") }}</base-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import {
	CHANGE_PREPARE,
	CHANGE_REST,
	CHANGE_WORK,
	CHANGE_CYCLES,
} from "@/store/actions.type";

import { pages } from "@/router/pages";

import BaseButton from "@/components/BaseButton/BaseButton.vue";
import BaseFieldNumber from "@/components/BaseFieldNumber/BaseFieldNumber.vue";

export default defineComponent({
	name: "Settings",

	components: {
		BaseButton,
		BaseFieldNumber,
	},

	computed: {
		...mapState(["prepare", "rest", "work", "cycles"]),
	},

	methods: {
		save(): void {
			this.$router.push({ name: pages.home });
		},

		updatePrepare(value: number): void {
			this.$store.commit(CHANGE_PREPARE, value);
		},

		updateRest(value: number): void {
			this.$store.commit(CHANGE_REST, value);
		},

		updateWork(value: number): void {
			this.$store.commit(CHANGE_WORK, value);
		},

		updateCycles(value: number): void {
			this.$store.commit(CHANGE_CYCLES, value);
		},
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
