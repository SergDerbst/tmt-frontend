import {FormControlConfig} from "../form.control.config";
import {FormControlValidationMap} from "../validation/form.control.validation.map";

export class FormControlDateInputConfig extends FormControlConfig {
	constructor(config: {
		type: string,
		key: string,
		validation: FormControlValidationMap,
		order: number
	}) {
		super(config);
	}
}