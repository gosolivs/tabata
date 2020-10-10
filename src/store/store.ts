import { createStore } from "vuex";

import { getStorage, setStorage } from "@/libs/storage/storage";

import {
	CHANGE_PREPARE,
	CHANGE_REST,
	CHANGE_WORK,
	CHANGE_CYCLES,
} from "./actions.type";
import { checkRange, Range } from "./helpers";

export type AppState = {
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

const time: Range = {
	min: 0,
	max: 60_000,
};

const cyclesR: Range = {
	min: 0,
	max: 50,
};

export const store = createStore<AppState>({
	state: () => {
		const prepare = getStorage(storageKeys.prepare);
		const rest = getStorage(storageKeys.rest);
		const work = getStorage(storageKeys.work);
		const cycles = getStorage(storageKeys.cycles);

		return {
			prepare:
				prepare !== null ? checkRange(Number.parseInt(prepare), time) : 2,
			rest: rest !== null ? checkRange(Number.parseInt(rest), time) : 20,
			work: work !== null ? checkRange(Number.parseInt(work), time) : 30,
			cycles:
				cycles !== null ? checkRange(Number.parseInt(cycles), cyclesR) : 8,
		};
	},

	mutations: {
		[CHANGE_PREPARE](state, raw: number): void {
			const value = checkRange(raw, time);

			state.prepare = value;
			setStorage(storageKeys.prepare, value.toString());
		},

		[CHANGE_REST](state, raw: number): void {
			const value = checkRange(raw, time);

			state.rest = value;
			setStorage(storageKeys.rest, value.toString());
		},

		[CHANGE_WORK](state, raw: number): void {
			const value = checkRange(raw, time);

			state.work = value;
			setStorage(storageKeys.work, value.toString());
		},

		[CHANGE_CYCLES](state, raw: number): void {
			const value = checkRange(raw, cyclesR);

			state.cycles = value;
			setStorage(storageKeys.cycles, value.toString());
		},
	},
});
