import {FormControlValidation} from "./form.control.validation";
import {Validators} from "@angular/forms";

export class FormControlValidationMap extends Map<string, FormControlValidation> {
	control: string;
	
	constructor(control: string) {
		super();
		this.control = control;
	}
	
	hasActive = (key: string):boolean => {
		let validation = this.get(key);
		return !validation ? false : validation.active;
	};
	
	setRequired = ():FormControlValidationMap => {
		this.set('required', new FormControlValidation({active: true, validator: Validators.required}));
		return this;
	};
}