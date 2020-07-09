import {FormXtraConfig} from "../form.xtra.config";
import {Direction} from "../../../../../../_utils/data/enums";

export class FormXtraButtonConfig extends FormXtraConfig {
	type: string;
	key: string;
	validate: boolean;
	
	constructor(config: {
		orientation: Direction,
		key: string,
		type: string,
		validate: boolean
	}) {
		super(config);
		this.type = config.type;
		this.key = config.key;
		this.validate = config.validate;
	}
}