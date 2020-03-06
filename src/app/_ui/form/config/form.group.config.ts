import {FormControlConfig} from "./controls/form.control.config";
import {FormConfig} from "./form.config";

export class FormGroupConfig {
	caption: string;
	captionVisible: boolean;
	controls: FormControlConfig[];
	order: number;
	
	constructor(config: {
		caption: string,
		captionVisible: boolean,
		controls: FormControlConfig[],
		order: number
	}) {
		this.caption = config.caption;
		this.captionVisible = config.captionVisible;
		this.controls = config.controls;
		this.order = config.order;
	}
}