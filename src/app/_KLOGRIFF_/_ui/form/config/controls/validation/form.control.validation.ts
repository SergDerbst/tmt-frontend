import {ValidatorFn} from "@angular/forms";

export class FormControlValidation {
	active: boolean;
	validator: ValidatorFn;
	value?: any;
	
	constructor(config: {
		active: boolean,
		validator: ValidatorFn,
		value?: any
	}) {
		this.active = config.active;
		this.validator = config.validator;
		this.value = config.value;
	}
	
	password() {
		return undefined;
	}
}