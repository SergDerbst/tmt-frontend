import {AppState} from "../../../_store/state/app.state";
import {createSelector} from "@ngrx/store";
import {VideoState} from "./video.state";

export const selectVideoState = (appState: AppState) => appState.contentState.videoState;

export const selectVideo = createSelector(
	selectVideoState,
	(videoState: VideoState) => videoState.video);