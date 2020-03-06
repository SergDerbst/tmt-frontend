import {FormSubmitService} from "../services/form.submit.service";
import {FormGroupConfig} from "./form.group.config";
import {FormXtraButtonConfig} from "./xtras/impl/form.xtra.button.config";
import {FormXtraLinkConfig} from "./xtras/impl/form.xtra.link.config";

export class FormConfig {
	id: string;
	showRequired: boolean;
	submitService: FormSubmitService;
	submitTarget: string;
	firstFocus: number; //tab index of element to set focus on first
	groups: FormGroupConfig[];
	buttons: FormXtraButtonConfig[];
	links: FormXtraLinkConfig[];
	
	constructor(config: {
		id: string,
		showRequired: boolean,
		submitService: FormSubmitService,
		submitTarget: string,
		firstFocus?: number;
		groups: FormGroupConfig[],
		buttons: FormXtraButtonConfig[],
		links: FormXtraLinkConfig[]
	}) {
		this.id = config.id;
		this.showRequired = config.showRequired;
		this.submitService = config.submitService;
		this.submitTarget = config.submitTarget;
		this.firstFocus = config.firstFocus | 2;
		this.groups = config.groups;
		this.buttons = config.buttons;
		this.links = config.links;
	}
}