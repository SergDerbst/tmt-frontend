import {createSelector} from "@ngrx/store";

export const contentState = (state) => state.contentState;
export const adminState = (state) => state.adminState;
export const filterState = (state) => state.filterState;

export const selectContentAdminState = createSelector(
	contentState,
	(state) => {
		return adminState(contentState(state))
	});

export const selectContentFilterState = createSelector(
	contentState,
	(state) => {
		return {
			...filterState(adminState(contentState(state))),
			contentType: state.contentState.adminState.selectedType
		}
	});