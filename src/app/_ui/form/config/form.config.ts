import {FormSubmitService} from "../services/form.submit.service";

/**
 * Configuration object for reactive forms. This is going to be attached to the
 * FormGroup that is being passed down as form value to the form component template.
 */
export class FormConfig {
	id: string;
	text?: string;
	showRequired: boolean;
	submitService: FormSubmitService;
	submitTarget: string;
	
	constructor(config: {
		id: string,
		text?: string,
		showRequired: boolean,
		submitService: FormSubmitService,
		submitTarget: string
	}) {
		this.id = config.id;
		this.text = config.text;
		this.showRequired = config.showRequired;
		this.submitService = config.submitService;
		this.submitTarget = config.submitTarget;
	}
}