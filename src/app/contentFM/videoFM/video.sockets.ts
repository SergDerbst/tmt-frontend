import {AuthSocket, DataSocket, ErrorSocket, LogicSocket, RouteSocket, StoreSocket} from "../../_patchbay/patchbay";
import {VideoCreateData, VideoData, VideoDomain} from "./video.data";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {TranscriptPlayer} from "../transcriptFM/transcript.player";
import {VideoState} from "./_store/video.state";

export interface VideoAuthSocket extends AuthSocket {}

export interface VideoDataSocket extends DataSocket {
	createVideo$: (videoCreateData: VideoCreateData) => Observable<VideoData>;
	loadVideo$: (videoId: number) => Observable<VideoData>;
	updateVideo$: (video: VideoData) => Observable<VideoData>;
}

export interface VideoErrorSocket extends ErrorSocket {
	videoCreation: (error: HttpErrorResponse) => Observable<HttpErrorResponse>;
	videoLoading: (error: HttpErrorResponse) => Observable<HttpErrorResponse>;
	videoUpdating: (error: HttpErrorResponse) => Observable<HttpErrorResponse>;
}

export interface VideoLogicSocket extends LogicSocket {
	setPlayer: (transcriptPlayer: TranscriptPlayer) => Observable<void>,
	showHintVideoSaving: () => Observable<void>,
	flashHintVideoSaved: (milliseconds?: number) => Observable<any>,
}

export interface VideoRouteSocket extends RouteSocket {
	editVideo: (videoId: number) => Observable<boolean>;
	videoId$: () => Observable<number>;
}

export interface VideoStoreSocket extends StoreSocket {
	prepareVideoForPlayer: (config: { domain: VideoDomain, videoId: string }) => Observable<void>;
	putVideo: (video: VideoData) => Observable<void>;
	video$: () => Observable<VideoData>,
	videoState$: () => Observable<VideoState>,
}