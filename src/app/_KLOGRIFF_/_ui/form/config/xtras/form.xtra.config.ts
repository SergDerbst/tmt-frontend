import {Direction} from "../../../../../data/_enums";

export abstract class FormXtraConfig {
	orientation: Direction;
	
	protected constructor(config: {
		orientation: Direction
	}) {
		this.orientation = config.orientation;
	}
}