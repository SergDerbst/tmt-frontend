import {AppState} from "../../../_store/state/app.state";
import {createSelector} from "@ngrx/store";
import {initialVideoState, VideoState} from "./video.state";
import {contentState} from "../../_store/content.selector";

export const videoState = (state) => state.videoState;

export const selectVideoState = createSelector(
	contentState,
	(state) => {
		return videoState(contentState(state)) ?? initialVideoState;
	});