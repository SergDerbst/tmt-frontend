import {FormControl} from "@angular/forms";
import {KeyValue} from "@angular/common";
import {FormControlValidationConfig} from "./form.control.validation.config";

export class FormControlConfig {
	type: string;
	order: number;
	validation?: {};
	autocomplete: {
		data?: { options: any[] },
		fetchSelect?: (event: UIEvent, index?: number, control?: FormControl) => void
		selection?: { current: any }
	};
	select: {
		items?: KeyValue<any, any>[]
	};
	
	constructor(config: {
		type: string,
		order: number,
		validation?: {},
		autocomplete: {
			data?: { options: any[] },
			fetchSelect?: (event: UIEvent, index?: number, control?: FormControl) => void,
			selection?: { current: any }
		},
		select: {
			items?: KeyValue<any, any>[]
		}
	}) {
		this.type = config.type;
		this.order = config.order;
		this.validation = config.validation || [];
		this.autocomplete = config.autocomplete;
		this.select = config.select;
	}
}