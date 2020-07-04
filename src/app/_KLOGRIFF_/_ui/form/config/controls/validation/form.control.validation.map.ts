import {FormControlValidation} from "./form.control.validation";
import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";
import {ValidationRegExMap} from "./validation.reg.ex.map";
import {DateTimeUnit, Operator} from "../../../../../../data/_enums";
import * as moment from 'moment';
import {DataValidationService} from "../../../services/data/data.validation.service";

export class FormControlValidationMap extends Map<string, FormControlValidation> {
	control: string;
	private regExpMap = new ValidationRegExMap();
	
	constructor(control: string) {
		super();
		this.control = control;
	}
	
	hasActive = (key: string):boolean => {
		let validation = this.get(key);
		return !validation ? false : validation.active;
	};
	
	setDate = (config?: {
		future?:boolean,
		minPast?: {unit: DateTimeUnit, value: number},
		maxPast?: {unit: DateTimeUnit, value: number}
	}) => {
		let dateDoneTyping = function(value:{year: number, month: number, day: number}) {
			return value && value.day && value.month && value.year;
		};
		let datePast = function(control: AbstractControl,
		                        config: {unit: DateTimeUnit, value: number},
		                        operator: Operator
		) {
			let validatePast = function(config:{unit: DateTimeUnit, value: number }) {
				switch(operator) {
					case Operator.LessThan:
						return now.diff(value, config.unit) < config.value ? {dateMinPast: {config: config}} : null;
					case Operator.MoreThan:
						return now.diff(value, config.unit) > config.value ? {dateMaxPast: {config: config}} : null;
				}
			};
			
			const now = moment().startOf(DateTimeUnit.day);
			const value = moment([
				control.value.year,
				control.value.month - 1, //moment is a bitch with months
				control.value.day,
			]);
			return validatePast(config);
		};
		
		config = config || {};
		this.set('dateMonth', new FormControlValidation({active: true, validator: month}));
		this.set('dateDay', new FormControlValidation({active: true, validator: day}));
		
		if (config.future === false) {
			this.set('dateNoFuture', new FormControlValidation({active: true, validator: noFuture}));
		}
		if (config.minPast) {
			this.set('dateMinPast', new FormControlValidation({active: true, validator: dateMinPast}));
		}
		if (config.maxPast) {
			this.set('dateMaxPast', new FormControlValidation({active: true, validator: dateMaxPast}));
		}
		return this;
		
		function dateMaxPast(control:AbstractControl):ValidationErrors | null {
			if (dateDoneTyping(control.value)) {
				return datePast(control, config.maxPast, Operator.MoreThan);
			}
			return null;
		}
		
		function dateMinPast(control:AbstractControl):ValidationErrors | null {
			if (dateDoneTyping(control.value)) {
				return datePast(control, config.minPast, Operator.LessThan);
			}
			return null;
		}
		
		function noFuture(control:AbstractControl):ValidationErrors | null {
			if (dateDoneTyping(control.value)) {
				const value = moment([control.value.year, control.value.month-1, control.value.day]).startOf(DateTimeUnit.day);
				const now = moment().startOf(DateTimeUnit.day);
				return now.diff(value, DateTimeUnit.day) < 0 ? {dateNoFuture: true} : null;
			}
			return null;
		}
		
		function day(control: AbstractControl):ValidationErrors | null {
			let date = control.value;
			let extendedMonth = function () {
				return date.day < 1 || date.day > 31 ? {dateDay: true} : null;
			};
			let standardMonth = function () {
				return date.day < 1 || date.day > 30 ? {dateDay: true} : null;
			};
			let leapMonth = function() {
				return date.month && date.month === 2;
			};
			let leapYear = function () {
				return date.year && date.year % 4 === 0 && leapMonth();
			};
			let extendedLeap = function () {
				return date.day < 1 || date.day > 29 ? {dateDay: true} : null;
			};
			let standardLeap = function () {
				return date.day < 1 || date.day > 28 ? {dateDay: true} : null;
			};
			
			if (date.month && date.day) {
				switch(Number(date.month)) {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						return extendedMonth();
					case 2:
						if (date.year) {
							return leapYear() ? extendedLeap() : standardLeap();
						}
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						return standardMonth();
				}
			}
			return null;
		}
		
		function month(control: AbstractControl):ValidationErrors | null {
			let date = control.value;
			if(date.month && (date.month < 1 || date.month > 12)) {
				return { dateMonth: true };
			}
			return null;
		}
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
		validationService: DataValidationService<any>
	}) {
		this.set('unique', new FormControlValidation({active: true, validator: unique}));
		
		function unique(control: AbstractControl): ValidationErrors | null {
			let valid = { ['unique']: false };
			if (control.statusChanges) {
				if (control.value && control.valid) {
					config.validationService.validate({
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
				}
			}
			return null;
		}
		return this;
	}
}