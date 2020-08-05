/**
 * Map containing date formats according to given locales.
 */
import {DateTimeUnit} from "./enums";

export class DateFormatMap extends Map<string, { format: string, separator: string, regexSep: RegExp }> {
	constructor() {
		super();
		this.set('en-US', { format: 'MM/dd/yyyy', separator: '/', regexSep: /\//g });
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

export class SimpleDate {
	day: number;
	month: number;
	year: number;
}

export class SimpleTime {
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	total: number;
	
	constructor(millis: number) {
		this.total = millis;
		let date = new Date(millis);
		this.hour = date.getHours() - 1;
		this.minute = date.getMinutes();
		this.second = date.getSeconds();
		this.millisecond = date.getMilliseconds();
	}
}