import {createFeatureSelector, createSelector} from "@ngrx/store";

export const contentState = createFeatureSelector('content');
export const adminState = (state) => state.adminState;
export const filterState = (state) => state.filterState;

export const selectContentAdminState = createSelector(
	contentState,
	(state) => {
		return adminState(state);
	});

export const selectContentFilterState = createSelector(
	contentState,
	(state) => {
		return filterState(state);
	});