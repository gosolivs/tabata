import Vue from "vue";
import Vuex from "vuex";

import {
	CHANGE_PREPARE,
	CHANGE_REST,
	CHANGE_WORK,
	CHANGE_CYCLES,
} from "./actions.type";
import { getStorage, setStorage } from "../utils/storage";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		prepare: getStorage("prepare") ? parseInt(getStorage("prepare"), 10) : 10,
		rest: getStorage("rest") ? parseInt(getStorage("rest"), 10) : 30,
		work: getStorage("work") ? parseInt(getStorage("work"), 10) : 30,
		cycles: getStorage("cycles") ? parseInt(getStorage("prepare"), 10) : 8,
	},

	mutations: {
		[CHANGE_PREPARE](state, value) {
			state.prepare = value;
			setStorage("prepare", value);
		},

		[CHANGE_REST](state, value) {
			state.rest = value;
			setStorage("rest", value);
		},

		[CHANGE_WORK](state, value) {
			state.work = value;
			setStorage("work", value);
		},

		[CHANGE_CYCLES](state, value) {
			state.cycles = value;
			setStorage("cycles", value);
		},
	},
});

export default store;
