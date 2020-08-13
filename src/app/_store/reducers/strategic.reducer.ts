export class StrategicReducer<S, A extends { type: string;	payload?: any; }> {
	constructor(private readonly strategies: { [key:string]: (S, A) => S }) {}
	
	reduce(state:S, action: A):S {
		const transformer = this.strategies[action.type] ?? this.strategies.__default__;
		return transformer(state, action);
	}
}