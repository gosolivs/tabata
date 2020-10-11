export type Range = {
	min: number;
	max: number;
};

export type State = {
	prepare: number;
	rest: number;
	work: number;
	cycles: number;
};

export enum Actions {
	changePrepare,
	changeRest,
	changeWork,
	changeCycles,
}

export type Events = {
	[Actions.changePrepare]: State["prepare"];
	[Actions.changeWork]: State["work"];
	[Actions.changeRest]: State["rest"];
	[Actions.changeCycles]: State["cycles"];
};
