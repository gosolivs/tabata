import { State, TimerStateMachine } from "@/libs/state-machine/timer/timer";

describe("TimerStateMachine", () => {
	it("init state", () => {
		const sm = new TimerStateMachine();

		expect(sm.state).toEqual(State.init);
	});

	it("set pause", () => {
		const sm = new TimerStateMachine();
		sm.transition(State.pause);

		expect(sm.state).toEqual(State.pause);
	});

	it("reset state", () => {
		const sm = new TimerStateMachine();
		sm.transition(State.pause);
		sm.reset();

		expect(sm.state).toEqual(State.init);
	});

	it("change state", () => {
		const sm = new TimerStateMachine();
		sm.transition(State.pause);
		sm.transition(State.prepare);
		sm.transition(State.work);
		sm.transition(State.rest);

		expect(sm.state).toEqual(State.rest);
	});

	it("init previous state", () => {
		const sm = new TimerStateMachine();

		expect(sm.prevState).toEqual(State.init);
	});

	it("first previous state", () => {
		const sm = new TimerStateMachine();
		sm.transition(State.pause);

		expect(sm.prevState).toEqual(State.init);
	});

	it("change previous state", () => {
		const sm = new TimerStateMachine();
		sm.transition(State.pause);
		sm.transition(State.prepare);
		sm.transition(State.work);
		sm.transition(State.rest);

		expect(sm.prevState).toEqual(State.work);
	});

	it("reset previous state", () => {
		const sm = new TimerStateMachine();
		sm.transition(State.work);
		sm.transition(State.rest);
		sm.reset();

		expect(sm.prevState).toEqual(State.init);
	});
});
