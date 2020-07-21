import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {validationRegex} from "./validation.regex.map";
import {FormControlValidationDate} from "./form.control.validation.date";
import {SimpleTimePeriod} from "../../data/date.and.time";
import {DateTimeUnit} from "../../data/enums";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../../../app.config.service";

/**
 * Service managing validator functions.
 */
@Injectable()
export class FormControlValidationService {
	
	constructor(private http: HttpClient,
	            private appConfigService: AppConfigService) {}
	
	/**
	 * Prepares the validation for the given uiControl. It returns an object with
	 * respective factories for validator functions. They can be called serially
	 * to prepare each validator accordingly. The compose method then combines
	 * the prepared validators by adding them as array to the given uiControl's
	 * validators and updating the uiControl.
	 *
	 * @param control
	 */
	prepare(control: AbstractControl) {
		let dateValidation = new FormControlValidationDate();
		let validation = this;
		let validators = [];
		let v = {
			compose: ():ValidatorFn[] => {
				control.setValidators(validators);
				control.updateValueAndValidity();
				return validators;
			},
			date: () => {
				return {
					complete: () => {
						validators.push(dateValidation.day());
						validators.push(dateValidation.noFuture());
						validators.push(dateValidation.maxPast(FormControlValidationDate.Default_Maximum_Age))
						validators.push(dateValidation.minPast(FormControlValidationDate.Default_Minimum_Age))
						validators.push(dateValidation.month());
						return v;
					}
					//add further and more detailed validation, when bitches need it
				}
			},
			email: () => {
				validators.push(validation.email());
				return v;
			},
			equalTo(otherControl: AbstractControl) {
				return {
					email: () => {
						validators.push(validation.equalValue(otherControl, 'equalEmail'));
						return v;
					},
					password: () => {
						validators.push(validation.equalValue(otherControl, 'equalPassword'));
						return v;
					}
				};
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
			hexColorCode: () => {
				validators.push(validation.hexColorCode());
				return v;
			},
			maxLength: (maxLength: number) => {
				validators.push(validation.maxLength(maxLength));
				return v;
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
			},
			unique: (dataId: string) => {
				validators.push(validation.unique(dataId));
				return v;
			}
		};
		
		return v;
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl value consists of a
	 * valid email address.
	 */
	private email(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if(!validationRegex().get('email').test(control.value)) {
				return { email: { active: true }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl has the same value
	 * as the given other uiControl.
	 *
	 * @param otherControl
	 * @param msgId
	 */
	private equalValue(otherControl: AbstractControl, msgId: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control.value !== otherControl.value) {
				return { [msgId]: { active: true }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl has a value that
	 * matches a hex color code.
	 */
	private hexColorCode(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('hexColorCode').test(control.value)) {
				return { hexColorCode: { active: true }};
			}
			return null;
		};
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl value contains
	 * at least one lower case character.
	 */
	private lowercase(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('Lowercase').test(control.value)) {
				return { lowercase: { active: true }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl value has
	 * at most the given maximum length.
	 *
	 * @param maxLength
	 */
	private maxLength(maxLength: number): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control.value && control.value.length > maxLength) {
				return { maxLength: { active: true, maxLength: maxLength }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl value has
	 * at least the given minimum length.
	 *
	 * @param minLength
	 */
	private minLength(minLength: number): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control.value.length < minLength) {
				return { minLength: { active: true, minLength: minLength }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl contains
	 * at least one numeric character.
	 */
	private numeric(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('Numeric').test(control.value)) {
				return { numeric: { active: true }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl has a value.
	 */
	private required():ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!control.value) {
				return { required: { active: true }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl value contains
	 * at least one special character (neither numeric nor letter).
	 */
	private specialCharacter(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			let special = validationRegex().get('Special');
			if (!special.test(control.value)) {
				return { specialCharacter: { active: true }};
			}
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl would pass data
	 * on submit that doesn't already exist (would be unique, e.g. a username).
	 * The validator calls a backend controller to validate whether the data
	 * already exists, but only if no other validation error exists (the current
	 * value is valid).
	 */
	private unique(dataId: string) {
		return (control: AbstractControl):ValidationErrors | null => {
			let baseUrl = this.appConfigService.apiBaseUrl() + '/data/validation/unique/';
			let validated = { ['unique']: { active: true }};
			
			if (control.value && control.errors === null) {
				this.http.get(baseUrl + dataId + '/' + control.value)
					.toPromise().catch(err => {
					if (control.errors) {
						control.errors.unique = validated;
					} else {
						control.setErrors(validated);
					}
				}).then(data => {
					if (control.errors) {
						control.errors.unique = undefined;
					}
				});
			}
			
			return null;
		}
	}
	
	/**
	 * Returns a validator that checks if the runtime uiControl value contains
	 * at least one upper case character.
	 */
	private uppercase(): ValidatorFn {
		return (control:AbstractControl): ValidationErrors | null => {
			if (!validationRegex().get('Uppercase').test(control.value)) {
				return { uppercase: { active: true }};
			}
			return null;
		}
	}
}