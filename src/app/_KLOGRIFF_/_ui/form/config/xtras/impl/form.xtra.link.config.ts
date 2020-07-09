import {FormXtraConfig} from "../form.xtra.config";
import {Direction} from "../../../../../../_utils/data/enums";

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