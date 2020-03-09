import {FormControlConfig} from "./form.control.config";
import {FormControlValidationMap} from "./validation/form.control.validation.map";

export abstract class FormControlDataConfig<T> extends FormControlConfig {
	data: { options: { key:string, value: T }[]};
	selection: { current: string, index: number };
	
	protected constructor(config: {
		type: string,
		key: string,
		validation: FormControlValidationMap,
		data: { options: { key:string, value: T }[]},
		selection: { current: string, index: number },
		order: number;
	}) {
		super(config);
		this.data = config.data;
		this.selection = config.selection;
	}
}

export class HighlightableStringValue {
	before: string;
	highlight: string;
	after: string;
	
	constructor(config: {
		before: string,
		highlight: string,
		after: string
	}) {
		this.before = config.before;
		this.highlight = config.highlight;
		this.after = config.after;
	}
	
	toString = () => {
		return this.before + this.highlight + this.after;
	}
}