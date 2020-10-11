import { createStoreon, StoreonStore } from "storeon";
import { reactive } from "vue";

import { getStorage, setStorage } from "@/libs/storage/storage";

import { checkRange } from "./helpers";
import { Range, State, Events, Actions } from "./types";

export { Actions };

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

const root = (store: StoreonStore<State, Events>) => {
	const prepare = getStorage(storageKeys.prepare);
	const rest = getStorage(storageKeys.rest);
	const work = getStorage(storageKeys.work);
	const cycles = getStorage(storageKeys.cycles);

	store.on("@init", () => ({
		prepare: prepare !== null ? checkRange(Number.parseInt(prepare), time) : 2,
		rest: rest !== null ? checkRange(Number.parseInt(rest), time) : 20,
		work: work !== null ? checkRange(Number.parseInt(work), time) : 30,
		cycles: cycles !== null ? checkRange(Number.parseInt(cycles), cyclesR) : 8,
	}));

	store.on(Actions.changePrepare, (state, prepareRaw) => {
		const prepare = checkRange(prepareRaw, time);

		setStorage(storageKeys.prepare, prepare.toString());
		return { prepare };
	});

	store.on(Actions.changeWork, (state, workRaw) => {
		const work = checkRange(workRaw, time);

		setStorage(storageKeys.work, work.toString());
		return { work };
	});

	store.on(Actions.changeRest, (state, restRaw) => {
		const rest = checkRange(restRaw, time);

		setStorage(storageKeys.rest, rest.toString());
		return { rest };
	});

	store.on(Actions.changeCycles, (state, cyclesRaw) => {
		const cycles = checkRange(cyclesRaw, cyclesR);

		setStorage(storageKeys.cycles, cycles.toString());
		return { cycles };
	});
};

const store = createStoreon<State, Events>([root]);

const reactiveState = reactive(store.get());
store.on("@changed", (_, changed) => {
	Object.keys(changed).forEach((key) => {
		if (!["prepare", "rest", "work", "cycles"].includes(key)) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		reactiveState[key] = changed[key];
	});
});

export function useStore() {
	return {
		dispatch: store.dispatch,
		get state() {
			return reactiveState;
		},
	};
}
