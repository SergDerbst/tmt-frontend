import {createFeatureSelector, createSelector} from "@ngrx/store";

export const videoState = createFeatureSelector('video');
export const video = (state) => state.video;

export const selectVideoState = createSelector(
	videoState,
	(state) => state);