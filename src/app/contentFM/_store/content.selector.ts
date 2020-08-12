import {AppState} from "../../_store/state/app.state";
import {createSelector} from "@ngrx/store";
import {ContentState} from "./content.state";

export const selectContentState = (appState: AppState) => appState.contentState;

export const selectContentConfig = createSelector(
	selectContentState,
	(contentState: ContentState) => contentState.contentConfig);

export const selectVideoState = createSelector(
	selectContentState,
	(contentState: ContentState) => contentState.videoState);