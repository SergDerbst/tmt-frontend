import {Action} from "@ngrx/store";
import {VideoData} from "../video.data";

export type VideoActions =
	VideoInitializeComponentAction |
	VideoLoadedSuccessAction |
	VideoLoadedErrorAction;

export enum VideoActionTypes {
	VideoInitializeComponent = '[Video] Initialize Component',
	VideoLoadedSuccess = '[Video] Loaded Success',
	VideoLoadedError = '[Video] Loaded Error',
}

export class VideoInitializeComponentAction implements Action {
	readonly type = VideoActionTypes.VideoInitializeComponent;
	constructor(public payload: {
		videoId: number;
	}) {}
}

export class VideoLoadedSuccessAction implements Action {
	readonly type = VideoActionTypes.VideoLoadedSuccess;
	constructor(public payload: {
		video: VideoData;
	}) {}
}

export class VideoLoadedErrorAction implements Action {
	readonly type = VideoActionTypes.VideoLoadedError;
	constructor(public payload: {
		error: any;
	}) {}
}