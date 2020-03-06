import {FormXtraConfig} from "../form.xtra.config";
import {Direction} from "../../../../../_data/_enums";

export class FormXtraLinkConfig extends FormXtraConfig {
	href: string;
	
	constructor(config: {
		super: { orientation: Direction },
		href: string
	}) {
		super(config.super);
		this.href = config.href;
	}
}