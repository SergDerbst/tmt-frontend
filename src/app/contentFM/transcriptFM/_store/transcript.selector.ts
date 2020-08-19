import {createFeatureSelector, createSelector} from "@ngrx/store";

export const transcriptState = createFeatureSelector('transcript');
export const transcript = (state) => state.transcript;

export const selectTranscriptState = createSelector(
	transcriptState,
	(state) => state);