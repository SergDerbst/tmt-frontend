import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {validationRegex} from "./validation.regex.map";

/**
 * Class containing factories for ValidatorFn functions.
 */
export class FormControlValidation {

	constructor(private control: AbstractControl) {}
	
	lowercase(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('Lowercase').test(control.value)) {
				return { lowercase: true };
			}
			return null;
		}
	}
	
	minLength(minLength: number): ValidatorFn {
		return Validators.minLength(minLength);
	}
	
	numeric(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('Numeric').test(control.value)) {
				return { numeric: true };
			}
			return null;
		}
	}
	
	required():ValidatorFn {
		return Validators.required;
	}
	
	specialCharacter(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('Special').test(control.value)) {
				return { specialCharacter: true };
			}
			return null;
		}
	}
	
	uppercase(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('Uppercase').test(control.value)) {
				return { uppercase: true };
			}
			return null;
		}
	}
}

/**
 * Factory for formConfig validation.
 *
 * @param control
 */
export function validation(control: AbstractControl) {
	let validation = new FormControlValidation(control);
	let validators = [];
	let v = {
		compose: ():ValidatorFn[] => {
			control.setValidators(validators);
			control.updateValueAndValidity();
			return validators;
		},
		character: {
			lowercase: () => {
				validators.push(validation.lowercase());
				return v;
			},
			numeric: () => {
				validators.push(validation.numeric());
				return v;
			},
			specialCharacter: () => {
				validators.push(validation.specialCharacter());
				return v;
			},
			uppercase: () => {
				validators.push(validation.uppercase());
				return v;
			}
		},
		minLength: (minLength: number) => {
			validators.push(validation.minLength(minLength));
			return v;
		},
		password: () => {
			validators.push(validation.lowercase());
			validators.push(validation.minLength(8));
			validators.push(validation.numeric());
			validators.push(validation.specialCharacter());
			validators.push(validation.uppercase());
			return v;
		},
		required: () => {
			validators.push(validation.required());
			return v;
		}
	};
	
	return v;
}