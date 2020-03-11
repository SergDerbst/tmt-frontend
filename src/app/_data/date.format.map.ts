
export class DateFormatMap extends Map<string, { format: string, separator: string, regexSep: RegExp }> {
	constructor() {
		super();
		this.set('en-US', { format: 'MM/dd/yyyy', separator: '/', regexSep: /\//g });
	}
}