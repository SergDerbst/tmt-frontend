import {FormControlConfig} from "./controls/form.control.config";
import {FormConfig} from "./form.config";
import {ValidatorFn} from "@angular/forms";

export class FormGroupConfig {
	caption: string;
	captionVisible: boolean;
	controls: FormControlConfig[];
	validators?: ValidatorFn[];
	order: number;
	
	constructor(config: {
		caption: string,
		captionVisible: boolean,
		controls: FormControlConfig[],
		validators?: ValidatorFn[],
		order: number
	}) {
		this.caption = config.caption;
		this.captionVisible = config.captionVisible;
		this.controls = config.controls;
		this.validators = config.validators || [];
		this.order = config.order;
	}
}