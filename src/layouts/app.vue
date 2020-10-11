<template>
	<div id="app">
		<home-page v-if="hasVisibleHomePage" />
		<settings-page v-else-if="hasVisibleSettingsPage" />
		<not-found-page v-else />
	</div>
</template>

<script lang="ts">
import { routerChanged, routerKey, RouterRecordState } from "@storeon/router";
import { defineComponent, computed, ref } from "vue";

import HomePage from "@/pages/home/index.vue";
import NotFoundPage from "@/pages/not-found/index.vue";
import SettingsPage from "@/pages/settings/index.vue";
import { pages } from "@/router/pages";
import { State as RouterLocalStore } from "@/router/router";
import { useStore } from "@/store/store";

function usePageName() {
	const pageName = ref("");

	const setPageName = (route: RouterRecordState<RouterLocalStore>) => {
		pageName.value = route.match === false ? "" : route.match.page;
	};

	return { pageName, setPageName };
}

export default defineComponent({
	components: {
		HomePage,
		SettingsPage,
		NotFoundPage,
	},

	setup() {
		const store = useStore();
		const { pageName, setPageName } = usePageName();

		setPageName(store.state[routerKey]);

		store.on(routerChanged, (_, route) => {
			setPageName(route);
		});

		const hasVisibleHomePage = computed(() => pageName.value === pages.home);
		const hasVisibleSettingsPage = computed(
			() => pageName.value === pages.settings,
		);

		return {
			hasVisibleHomePage,
			hasVisibleSettingsPage,
		};
	},
});
</script>

<style>
#app {
	height: 100%;
}
</style>
