import {ContentActions, ContentActionTypes} from "./content.actions";
import {ContentState, initialContentState} from "./content.state";
import {ActionReducer} from "@ngrx/store";
import {StrategicReducer} from "../../_store/reducers/strategic.reducer";

const reducer = new StrategicReducer(ContentActionTypes, {
	[ContentActionTypes.SelectContentType]: selectContentType,
	[ContentActionTypes.SelectFilterType]: selectFilterType,
	__default__: (state, action) => initialContentState
});

export const contentReducer: ActionReducer<ContentState> = (
	state = initialContentState,
	action: ContentActions
) => {
	return reducer.reduce(state, action);
}

function selectContentType(state, action) {
	return {
		...state,
		adminState: {
			...state.adminState,
			selectedType: state.adminState.contentTypes[action.payload.index],
		}
	};
}

function selectFilterType(state, action) {
	return {
		...state,
			filterState: {
				...state.filterState,
				selectedFilter: state.filterState.contentFilters[action.payload.index]
		}
	};
}
