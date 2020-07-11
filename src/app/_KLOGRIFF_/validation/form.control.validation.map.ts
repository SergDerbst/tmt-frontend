import {FormControlValidation} from "./form.control.validation";
import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";
import {ValidationRegexMap} from "../../_utils/form/validation/validation.regex.map";
import {DateTimeUnit, Operator} from "../../_utils/data/enums";
import * as moment from 'moment';

export class FormControlValidationMap extends Map<string, FormControlValidation> {
	control: string;
	private regExpMap = new ValidationRegexMap();
	
	constructor(control: string) {
		super();
		this.control = control;
	}
	
	hasActive = (key: string):boolean => {
		let validation = this.get(key);
		return !validation ? false : validation.active;
	};
	
	setEmail = () => {
		const _email = 'email';
		const regExPatterns = this.regExpMap;
		this.set(_email, new FormControlValidation({active: true, validator: email}));
		return this;
		
		function email(control: AbstractControl): ValidationErrors | null {
			const regX = regExPatterns.get(_email);
			return regX.test(control.value) ? null : { [_email]: true };
		}
	};
	
	setMinLength = (num:number):FormControlValidationMap => {
		this.set('minlength', new FormControlValidation({active: true, value: num, validator: Validators.minLength(num)}));
		return this;
	};
	
	setPassword = (property:string) => {
		const errorName = 'pw' + property;
		const regExPatterns = this.regExpMap;
		this.set(errorName, new FormControlValidation({active: true, validator: pw}));
		return this;
		
		function pw(control: AbstractControl): ValidationErrors | null {
			const regX = regExPatterns.get(property);
			return regX.test(control.value) ? null : { [errorName]: true };
		}
	};
	
	setRequired = ():FormControlValidationMap => {
		this.set('required', new FormControlValidation({active: true, validator: Validators.required}));
		return this;
	};
	
	setUnique(config: {
		fieldName: string,
		url: string,
		//validationService: DataValidationService<any>
	}) {
		this.set('unique', new FormControlValidation({active: true, validator: unique}));
		
		function unique(control: AbstractControl): ValidationErrors | null {
			let valid = { ['unique']: false };
			if (control.statusChanges) {
				if (control.value && control.valid) {
					/**config.validationService.validate({
						toValidate: control.value,
						fieldName: config.fieldName,
						url: config.url
					}).toPromise().catch(err => {
						if (control.errors) {
							control.errors.unique = true;
						} else {
							control.setErrors(valid);
						}
					}).then(data => {
						if (control.errors) {
							control.errors.unique = undefined;
						}
					});
					 */
				}
			}
			return null;
		}
		return this;
	}
}