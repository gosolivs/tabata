<template>
	<div class="settings">
		<div class="settings__wrap">
			<h1 class="settings__title">Настройки</h1>

			<div class="settings__main">
				<div class="settings__field">
					<Field v-model="prepare" label="Подготовка" />
				</div>
				<div class="settings__field">
					<Field v-model="rest" label="Отдых" />
				</div>
				<div class="settings__field">
					<Field v-model="work" label="Работа" />
				</div>
				<div class="settings__field">
					<Field v-model="cycles" label="Количество раундов" />
				</div>
			</div>

			<div class="settings__controls">
				<Button isGray :onClick="cancel">Отмена</Button>
				<Button :onClick="save">Сохранить</Button>
			</div>
		</div>
	</div>
</template>

<script>
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

	data: () => ({
		prepare: 10,
		rest: 30,
		work: 30,
		cycles: 8,
	}),

	methods: {
		cancel() {
			router.push({ name: routeName.home });
		},

		save() {
			router.push({ name: routeName.home });
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
}

.settings__controls {
	display: flex;
	align-items: flex-start;
	margin-left: -20px;
}

.settings__controls > * {
	margin-left: 20px;
	flex: 1 1 50%;
}
</style>
