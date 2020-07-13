/**
 * Class for validating values of date controllers, aka. FormControlDateController.
 */
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from "moment";
import {DateTimeUnit, Operator} from "../../data/enums";
import {SimpleTimePeriod} from "../../data/date.and.time";

/**
 * All the things you need for date validation.
 */
export class FormControlValidationDate {
	public static Default_Maximum_Age = new SimpleTimePeriod(99, DateTimeUnit.year);
	public static Default_Minimum_Age = new SimpleTimePeriod(14, DateTimeUnit.year);
	
	/**
	 * Returns true when complete three values - day, month, year - have been set.
	 * @param value
	 */
	private dateDoneTyping (value:{ year: number, month: number, day: number }) {
		return value && value.day && value.month && value.year;
	};
	
	/**
	 * Validates whether a date lies within a given time period in the past
	 * (minimum or maximum according to the given Operator).
	 *
	 * @param control
	 * @param period
	 * @param operator
	 */
	private validatePast (control: AbstractControl,
	                      period: SimpleTimePeriod,
	                      operator: Operator) {
		let validatePast = function(period: SimpleTimePeriod) {
			switch(operator) {
				case Operator.LessThan:
					return now.diff(value, period.unit) < period.amount ? {
						dateMinPast: { active: true, dateMinPast: period }} : null;
				case Operator.MoreThan:
					return now.diff(value, period.unit) > period.amount ? {
						dateMaxPast: { active: true, dateMaxPast: period }} : null;
			}
		};
		
		const now = moment().startOf(DateTimeUnit.day);
		const value = moment([
			control.value.year,
			control.value.month - 1, //moment is a bitch with months
			control.value.day,
		]);
		return validatePast(period);
	}
	
	/**
	 * Checks if the given value for a day is valid.
	 */
	day():ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			let date = control.value;
			let extendedMonth = function () {
				return date.day < 1 || date.day > 31 ? { dateDay: { active: true }} : null;
			};
			let standardMonth = function () {
				return date.day < 1 || date.day > 30 ? { dateDay: { active: true }} : null;
			};
			let leapMonth = function () {
				return date.month && date.month === 2;
			};
			let leapYear = function () {
				return date.year && date.year % 4 === 0 && leapMonth();
			};
			let extendedLeap = function () {
				return date.day < 1 || date.day > 29 ? { dateDay: { active: true }} : null;
			};
			let standardLeap = function () {
				return date.day < 1 || date.day > 28 ? { dateDay: { active: true }} : null;
			};
			
			if (date.month && date.day) {
				switch (Number(date.month)) {
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
	}
	
	/**
	 * Checks if the given value of a date is not older before today as the
	 * given maximum period.
	 *
	 * @param minPast
	 */
	maxPast(maxPast: SimpleTimePeriod) {
		return (control:	AbstractControl): ValidationErrors | null => {
			if (this.dateDoneTyping(control.value)) {
				return this.validatePast(control, maxPast, Operator.MoreThan);
			}
			return null;
		}
	}
	
	/**
	 * Checks if the given value of a date is at least as old before today as the
	 * given minium period.
	 *
	 * @param minPast
	 */
	minPast(minPast: SimpleTimePeriod): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (this.dateDoneTyping(control.value)) {
				return this.validatePast(control, minPast, Operator.LessThan);
			}
			return null;
		}
	}
	
	/**
	 * Checks that the given value for a date isn't in the future.
	 */
	noFuture(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (this.dateDoneTyping(control.value)) {
				const value = moment([
					control.value.year,
					control.value.month - 1,
					control.value.day]).startOf(DateTimeUnit.day);
				const now = moment().startOf(DateTimeUnit.day);
				return now.diff(value, DateTimeUnit.day) < 0 ? { dateFuture: { active: true }} : null;
			}
			return null;
		}
	}
	
	/**
	 * Checks if the given value for a month is valid.
	 */
	month(): ValidatorFn {
		return (control: AbstractControl):ValidationErrors | null => {
			let date = control.value;
			if (date.month && (date.month < 1 || date.month > 12)) {
				return { dateMonth: { active: true }};
			}
			return null;
		}
	}
}