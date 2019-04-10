<template>
	<div class="settings">
		<div class="settings__wrap">
			<h1 class="settings__title">Настройки</h1>

			<div class="settings__main">
				<div class="settings__field">
					<Field :value="prepare" @input="updatePrepare" label="Подготовка" />
				</div>
				<div class="settings__field">
					<Field :value="rest" @input="updateRest" label="Отдых" />
				</div>
				<div class="settings__field">
					<Field :value="work" @input="updateWork" label="Работа" />
				</div>
				<div class="settings__field">
					<Field
						:value="cycles"
						@input="updateCycles"
						label="Количество раундов"
					/>
				</div>
			</div>

			<div class="settings__controls">
				<Button :onClick="save">Закрыть</Button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import {
	CHANGE_PREPARE,
	CHANGE_REST,
	CHANGE_WORK,
	CHANGE_CYCLES,
} from "@/store/actions.type";

import router from "@/router";
import routeName from "@/router/routeName";

import Button from "@/components/Button";
import Field from "@/components/Field";

export default {
	name: "Settings",

	components: {
		Button,
		Field,
	},

	computed: {
		...mapState({
			prepare: state => state.prepare,
			rest: state => state.rest,
			work: state => state.work,
			cycles: state => state.cycles,
		}),
	},

	methods: {
		save() {
			router.push({ name: routeName.home });
		},

		updatePrepare(value) {
			this.$store.commit(CHANGE_PREPARE, value);
		},

		updateRest(value) {
			this.$store.commit(CHANGE_REST, value);
		},

		updateWork(value) {
			this.$store.commit(CHANGE_WORK, value);
		},

		updateCycles(value) {
			this.$store.commit(CHANGE_CYCLES, value);
		},
	},
};
</script>

<style scoped>
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
