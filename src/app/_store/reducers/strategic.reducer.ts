export class StrategicReducer<S, A extends { type: string;	payload?: any; }> {
	constructor(
		private readonly actionTypes: any,
		private readonly strategies: { [key:string]: (S, A) => S }
	) {}
	
	private shouldReduce(action: A):boolean {
		let values = Object.values(this.actionTypes);
		for (let i = 0, len = values.length; i < len; i++) {
			if (values[i] === action.type) {
				return true;
			}
		}
	}
	
	reduce(state:S, action: A):S {
		if (this.shouldReduce(action)) {
			const transformer = this.strategies[action.type] ?? this.strategies.__default__;
			return transformer(state, action);
		}
		return state;
	}
}