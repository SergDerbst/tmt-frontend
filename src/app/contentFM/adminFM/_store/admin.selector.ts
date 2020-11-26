import {createFeatureSelector, createSelector} from "@ngrx/store";

export const adminState = createFeatureSelector('admin');
export const contentTypeState = (state) => state.contentTypeState;
export const contentFilterState = (state) => state.contentFilterState;

export const selectContentTypeState = createSelector(
	adminState,
	(state) => {
		return contentTypeState(state);
	});

export const selectContentFilterState = createSelector(
	adminState,
	(state) => {
		return contentFilterState(state);
	});