import { FormElementBase } from './form.element.base';

export class FormElementInputDate extends FormElementBase<string> {
	type = "date";
	
	constructor(options: {} = {}) {
		super(options);
	}
}