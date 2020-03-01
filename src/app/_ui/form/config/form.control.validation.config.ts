import {ValidatorFn, Validators} from "@angular/forms";

export class FormControlValidationConfig {
	name: string;
	active: boolean;
	validator: ValidatorFn;
	value?: any;
	
	constructor(config: {
		name: string,
		active: boolean,
		validator: ValidatorFn,
		value?: any
	}) {
		this.name = config.name;
		this.active = config.active;
		this.validator = config.validator;
		this.value = config.value;
	}
}

export function required(): FormControlValidationConfig {
	return new FormControlValidationConfig({name: 'required', active: true, validator: Validators.required});
}