import Vue from "vue";
import Vuex from "vuex";

import {
	CHANGE_PREPARE,
	CHANGE_REST,
	CHANGE_WORK,
	CHANGE_CYCLES,
} from "./actions.type";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		prepare: 10,
		rest: 30,
		work: 30,
		cycles: 8,
	},

	mutations: {
		[CHANGE_PREPARE](state, value) {
			state.prepare = value;
		},

		[CHANGE_REST](state, value) {
			state.rest = value;
		},

		[CHANGE_WORK](state, value) {
			state.work = value;
		},

		[CHANGE_CYCLES](state, value) {
			state.cycles = value;
		},
	},
});

export default store;
