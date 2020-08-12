import {ContentActions, ContentActionTypes} from "./content.actions";
import {initialContentState} from "./content.state";

export const contentReducer = (
	state = initialContentState,
	action: ContentActions
) => {
	switch(action.type) {
		default:
			return state;
	}
}
