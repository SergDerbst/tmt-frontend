import { FormElementBase } from "../elements/form.element.base";

export class FormControlGroupConfig {
	caption: string;
	captionVisible: boolean;
	elements: FormElementBase<any>[];
	
	constructor(config: {
		caption: string,
		captionVisible: boolean,
		elements: FormElementBase<any>[]
	}) {
		this.caption = config.caption;
		this.captionVisible = config.captionVisible;
		this.elements = config.elements;
	}
}