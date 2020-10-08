export enum State {
	init,
	pause,
	prepare,
	work,
	rest,
}

export class TimerStateMachine {
	_state: State = State.init;
	_prevState: State = State.init;

	public transition(state: State): void {
		this._prevState = this._state;
		this._state = state;
	}

	public reset(): void {
		this._state = State.init;
		this._prevState = State.init;
	}

	public get state(): State {
		return this._state;
	}

	public get prevState(): State {
		return this._prevState;
	}
}
