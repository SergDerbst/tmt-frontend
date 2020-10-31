import {Action} from "@ngrx/store";
import {VideoData, VideoDomain} from "../video.data";
import {HttpErrorResponse} from "@angular/common/http";

export type VideoActions =
	VideoLoadAction |
	VideoPutAction;

export enum VideoActionTypes {
	VideoLoad = '[Video] Load',
	VideoPut = '[Video] Put',
	VideoPrepareForPlayer = '[Video] Prepare for Player',
}

export class VideoLoadAction implements Action {
	readonly type = VideoActionTypes.VideoLoad;
	constructor(public payload: { videoId: number }) {}
}

export class VideoPutAction implements Action {
	readonly type = VideoActionTypes.VideoPut;
	constructor(public payload: {
		video: VideoData;
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