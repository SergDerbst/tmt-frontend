import {FormXtraConfig} from "../form.xtra.config";
import {Direction} from "../../../../../_data/_enums";

export class FormXtraLinkConfig extends FormXtraConfig {
	key: string;
	href: string;
	
	constructor(config: {
		key:string,
		orientation: Direction ,
		href: string
	}) {
		super(config);
		this.key = config.key;
		this.href = config.href;
	}
}