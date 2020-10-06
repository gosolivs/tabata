import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

import { State } from "../src/store";

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
