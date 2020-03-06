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