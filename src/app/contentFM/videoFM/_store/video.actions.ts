import {Action} from "@ngrx/store";
import {VideoData} from "../video.data";

export type VideoActions =
	VideoInitializeEditComponentAction |
	VideoLoadedSuccessAction |
	VideoLoadedErrorAction;

export enum VideoActionTypes {
	VideoCreate = '[Video] Create',
	VideoCreatedSuccess = '[Video] Created Success',
	VideoCreatedError = '[Video] Created Error',
	VideoInitializeEditComponent = '[Video] Initialize Component',
	VideoLoadedSuccess = '[Video] Loaded Success',
	VideoLoadedError = '[Video] Loaded Error',
}

export class VideoCreateAction implements Action {
	readonly type = VideoActionTypes.VideoCreate;
	constructor(public payload: {
		title: string,
		url: string,
	}) {}
}

export class VideoCreatedSuccessAction implements Action {
	readonly type = VideoActionTypes.VideoCreatedSuccess;
	constructor(public payload: { video: VideoData }) {
	}
}

export class VideoCreatedErrorAction implements Action {
	readonly type = VideoActionTypes.VideoCreatedError;
	constructor(public payload: any) {}
}

export class VideoInitializeEditComponentAction implements Action {
	readonly type = VideoActionTypes.VideoInitializeEditComponent;
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