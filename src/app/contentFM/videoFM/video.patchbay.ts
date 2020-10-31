import {
	AuthSocket,
	DataSocket, ErrorSocket,
	Socket,
	Patchbay,
	SocketProvider, LogicSocket,
	RouteSocket,
	StoreSocket
} from "../../_patchbay/patchbay";
import {Router, Event, ActivationEnd} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {defer, Observable, of} from "rxjs";
import {VideoCreateData, VideoData, VideoDomain} from "./video.data";
import {selectVideoState, videoState} from "./_store/video.selectors";
import {filter, map} from "rxjs/operators";
import {VideoState} from "./_store/video.state";
import {KeysJunctionFactory} from "../../_utils/keyboard/keys.junction";
import {VideoDataService} from "./video.data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {VideoPrepareForPlayerAction, VideoPutAction} from "./_store/video.actions";
import {FlashHintAction, ReplaceHintAction, UpdateHintFromUrlAction} from "../../main/header/_store/header.actions";
import {globalHintFlashingTime} from "../../main/header/_store/header.state";
import {TranscriptService} from "../transcriptFM/transcript.service";
import {TranscriptPlayer} from "../transcriptFM/transcript.player";

export interface VideoAuthJunction extends AuthSocket {}
export interface VideoDataJunction extends DataSocket {
	createVideo$: (videoCreateData: VideoCreateData) => Observable<VideoData>;
	loadVideo$: (videoId: number) => Observable<VideoData>;
	updateVideo$: (video: VideoData) => Observable<VideoData>;
}

export interface VideoErrorJunction extends ErrorSocket {
	videoCreation: (error: HttpErrorResponse) => Observable<HttpErrorResponse>;
	videoLoading: (error: HttpErrorResponse) => Observable<HttpErrorResponse>;
	videoUpdating: (error: HttpErrorResponse) => Observable<HttpErrorResponse>;
}

export interface VideoLogicJunction extends LogicSocket {
	setPlayer: (transcriptPlayer: TranscriptPlayer) => Observable<void>,
	showHintVideoSaving: () => Observable<void>,
	flashHintVideoSaved: (milliseconds?: number) => Observable<any>,
}

export interface VideoRouteJunction extends RouteSocket {
	editVideo: (videoId: number) => Observable<boolean>;
	videoId$: () => Observable<number>;
}

export interface VideoStoreJunction extends StoreSocket {
	prepareVideoForPlayer: (config: { domain: VideoDomain, videoId: string }) => Observable<void>;
	putVideo: (video: VideoData) => Observable<void>;
	video$: () => Observable<VideoData>,
	videoState$: () => Observable<VideoState>,
}

@Injectable()
export class VideoPatchbay extends Patchbay<
	VideoAuthJunction,
	VideoDataJunction,
	VideoErrorJunction,
	VideoLogicJunction,
	VideoRouteJunction,
	VideoStoreJunction> {
	constructor(private readonly keysFactory: KeysJunctionFactory,
							private readonly redux: Store,
	            private readonly router: Router,
	            private readonly transcriptService: TranscriptService,
	            private readonly videoDataService: VideoDataService) {
		super();
		this.addSocket('keys', this.keysFactory.create());
		this.data({
			createVideo$: (videoCreateData: VideoCreateData) => this.videoDataService.createVideo(videoCreateData),
			loadVideo$: (videoId: number) => this.videoDataService.loadVideo(videoId),
			updateVideo$: (video: VideoData) => this.videoDataService.updateVideo(video),
		});
		this.error({
			videoCreation: (error: HttpErrorResponse) => of(error), //TODO global or other error handling
			videoLoading: (error: HttpErrorResponse) => of(error),
			videoUpdating: (error: HttpErrorResponse) => of(error)
		});
		this.logic({
			setPlayer: (transcriptPlayer: TranscriptPlayer) => of(this.transcriptService.setPlayer(transcriptPlayer)),
			showHintVideoSaving: () => of(this.redux.dispatch(new ReplaceHintAction({ messageKey: 'content.transcript.edit.saving' }))),
			flashHintVideoSaved: (milliseconds?: number) => {
				this.redux.dispatch(new FlashHintAction({ messageKey: 'content.transcript.edit.saved' }));
				return of(window.setTimeout(() => {
					this.redux.dispatch(new UpdateHintFromUrlAction({ url: this.router.url }));
				}, milliseconds || globalHintFlashingTime));
			},
		});
		this.route({
			editVideo: (videoId: number) => defer(() => this.router.navigateByUrl('content/video/' + videoId + '/edit')),
			videoId$: () => this.router.events
				.pipe(
					filter((event) => event instanceof ActivationEnd),
					map((event: ActivationEnd) => event.snapshot.params),
					filter((params) => params.videoId !== undefined),
					map((params) => params.videoId),
				),
		});
		this.store({
			prepareVideoForPlayer: (config: { domain: VideoDomain, videoId: string }) => of(this.redux.dispatch(new VideoPrepareForPlayerAction({
				domain: config.domain,
				videoId: config.videoId
			}))),
			putVideo: (video: VideoData) => of(this.redux.dispatch(new VideoPutAction({ video: video }))),
			video$: () => this.redux
				.pipe(
					select(videoState),
					filter((videoState: VideoState) => videoState.video !== undefined),
					map(videoState => videoState.video),
					filter(video => video.header.domain === undefined),
				),
			videoState$: () => this.redux
				.pipe(
					select(selectVideoState),
					filter((videoState: VideoState) => videoState.video !== undefined),
					filter((videoState: VideoState) => videoState.video.header.domain === undefined)
				),
			}
		)
	}
	
	keys: SocketProvider<any> = (): Socket => {
		return this.sockets['keys'];
	}
}
