/**
 * Map containing date formats according to given locales.
 */
import {DateTimeUnit} from "./enums";

export class DateFormatMap extends Map<string, { format: string, separator: string, regexSep: RegExp }> {
	constructor() {
		super();
		this.set('en-US', { format: 'MM/DD/YYYY', separator: '/', regexSep: /\//g });
	}
}

export class SimpleTimePeriod {
	amount: number;
	unit: DateTimeUnit;
	
	constructor(amount: number, unit: DateTimeUnit) {
		this.amount = amount;
		this.unit = unit;
	}
}

export class DayOfBirth {
	day: number;
	month: number;
	year: number;
}