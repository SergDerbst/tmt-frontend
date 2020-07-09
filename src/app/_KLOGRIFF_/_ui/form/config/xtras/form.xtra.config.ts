import {Direction} from "../../../../../_utils/data/enums";

export abstract class FormXtraConfig {
	orientation: Direction;
	
	protected constructor(config: {
		orientation: Direction
	}) {
		this.orientation = config.orientation;
	}
}