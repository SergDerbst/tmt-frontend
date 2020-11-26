import {AdminActions, ContentActionTypes} from "./admin.actions";
import {AdminState, initialContentAdminState, initialAdminState} from "./admin.state";
import {ActionReducer} from "@ngrx/store";
import {StrategicReducer} from "../../../_store/reducers/strategic.reducer";

const reducer = new StrategicReducer(ContentActionTypes, {
	[ContentActionTypes.SelectContentType]: selectContentType,
	[ContentActionTypes.SelectFilterType]: selectFilterType,
	__default__: (state, action) => initialAdminState
});

export const adminReducer: ActionReducer<AdminState> = (
	state = initialAdminState,
	action: AdminActions
) => {
	return reducer.reduce(state, action);
}

function selectContentType(state, action) {
	return {
		...state,
		contentTypeState: {
			...state.contentTypeState,
			selectedType: state.contentTypeState.contentTypes[action.payload.index],
		}
	};
}

function selectFilterType(state, action) {
	return {
		...state,
			contentFilterState: {
				...state.contentFilterState,
				selectedFilter: state.contentFilterState.contentFilters[action.payload.index]
		}
	};
}
