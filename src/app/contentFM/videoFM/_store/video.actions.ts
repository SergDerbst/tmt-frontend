import {Action} from "@ngrx/store";
import {VideoData, VideoDomain} from "../video.data";
import {HttpErrorResponse} from "@angular/common/http";

export type VideoActions =
	VideoLoadAction |
	VideoLoadedSuccessAction |
	VideoLoadedErrorAction;

export enum VideoActionTypes {
	VideoLoad = '[Video] Load',
	VideoLoadedSuccess = '[Video] Loaded Success',
	VideoLoadedError = '[Video] Loaded Error',
	VideoPrepareForPlayer = '[Video] Prepare for Player',
}

export class VideoLoadAction implements Action {
	readonly type = VideoActionTypes.VideoLoad;
	constructor(public payload: { videoId: number }) {}
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

export class VideoPrepareForPlayerAction implements Action {
	readonly type = VideoActionTypes.VideoPrepareForPlayer;
	constructor(public payload: {
		domain: VideoDomain,
		videoId: string,
	}) {
	}
}