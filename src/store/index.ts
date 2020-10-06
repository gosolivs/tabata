import { createStore } from "vuex";

import { getStorage, setStorage } from "@/utils/storage";

import {
	CHANGE_PREPARE,
	CHANGE_REST,
	CHANGE_WORK,
	CHANGE_CYCLES,
} from "./actions.type";

export type State = {
	prepare: number;
	rest: number;
	work: number;
	cycles: number;
};

const storageKeys = {
	prepare: "prepare",
	rest: "rest",
	work: "work",
	cycles: "cycles",
};

export const store = createStore<State>({
	state: () => {
		const prepare = getStorage(storageKeys.prepare);
		const rest = getStorage(storageKeys.rest);
		const work = getStorage(storageKeys.work);
		const cycles = getStorage(storageKeys.cycles);

		return {
			prepare: prepare !== null ? parseInt(prepare, 10) : 10,
			rest: rest !== null ? parseInt(rest, 10) : 30,
			work: work !== null ? parseInt(work, 10) : 30,
			cycles: cycles !== null ? parseInt(cycles, 10) : 8,
		};
	},

	mutations: {
		[CHANGE_PREPARE](state, value) {
			state.prepare = value;
			setStorage(storageKeys.prepare, value);
		},

		[CHANGE_REST](state, value) {
			state.rest = value;
			setStorage(storageKeys.rest, value);
		},

		[CHANGE_WORK](state, value) {
			state.work = value;
			setStorage(storageKeys.work, value);
		},

		[CHANGE_CYCLES](state, value) {
			state.cycles = value;
			setStorage(storageKeys.cycles, value);
		},
	},
});
