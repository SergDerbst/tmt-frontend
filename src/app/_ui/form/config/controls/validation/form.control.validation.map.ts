import {FormControlValidation} from "./form.control.validation";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
	
	setEmail = () => {
		this.set('email', new FormControlValidation({active: true, validator: Validators.email}));
		return this;
	};
	
	setMinLength = (num:number):FormControlValidationMap => {
		this.set('minlength', new FormControlValidation({active: true, value: num, validator: Validators.minLength(num)}));
		return this;
	};
	
	setRequired = ():FormControlValidationMap => {
		this.set('required', new FormControlValidation({active: true, validator: Validators.required}));
		return this;
	};
}