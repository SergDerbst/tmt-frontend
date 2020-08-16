import {createFeatureSelector, createSelector} from "@ngrx/store";

export const videoState = createFeatureSelector('video');
export const video = (state) => state.video;

export const selectVideo = createSelector(
	videoState,
	(state) =>
	{
		console.log('arsch bummbeck', state);
		return {
			...video(state)
		};
	});