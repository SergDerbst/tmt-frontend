import {FormControlDataConfig} from "../form.control.data.config";
import {FormControlValidationMap} from "../validation/form.control.validation.map";

export class FormControlSelectInputConfig<T> extends FormControlDataConfig<T> {
	constructor(config: {
		type: 'select',
		key: string,
		validation: FormControlValidationMap,
		data: { options: { key:string, value: T }[]},
		selection: { current: string, index: number },
		order: number
	}) {
		super(config);
	}
}