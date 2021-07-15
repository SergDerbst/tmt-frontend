import {Patchbay, Socket, SocketProvider} from "patchbay";
import {ActivationEnd, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {defer, of} from "rxjs";
import {VideoCreateData, VideoData, VideoDomain} from "./video.data";
import {selectVideoState, videoState} from "./_store/video.selectors";
import {filter, map} from "rxjs/operators";
import {VideoState} from "./_store/video.state";
import {KeysSocketFactory} from "../../_utils/keyboard/keys.socket";
import {VideoDataService} from "./_services/video.data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {VideoPrepareForPlayerAction, VideoPutAction} from "./_store/video.actions";
import {FlashHintAction, ReplaceHintAction, UpdateHintFromUrlAction} from "../../main/header/_store/header.actions";
import {globalHintFlashingTime} from "../../main/header/_store/header.state";
import {TranscriptService} from "../transcriptFM/transcript.service";
import {TranscriptPlayer} from "../transcriptFM/transcript.player";
import {
	VideoAuthSocket,
	VideoDataSocket,
	VideoErrorSocket,
	VideoLogicSocket,
	VideoRouteSocket,
	VideoStoreSocket
} from "./video.sockets";

@Injectable()
export class VideoPatchbay extends Patchbay<
	VideoAuthSocket,
	VideoDataSocket,
	VideoErrorSocket,
	VideoLogicSocket,
	VideoRouteSocket,
	VideoStoreSocket> {
	
	constructor(private readonly keysFactory: KeysSocketFactory,
							private readonly redux: Store,
	            private readonly router: Router,
	            private readonly transcriptService: TranscriptService,
	            private readonly videoDataService: VideoDataService) {
		super();
		this.dataSocket();
		this.errorSocket();
		this.keysSocket();
		this.logicSocket();
		this.routeSocket();
		this.storeSocket();
	}
	
	keys: SocketProvider<any> = (): Socket => {
		return super.sockets['keys'];
	}
	
	private dataSocket() {
		super.data({
			createVideo$: (videoCreateData: VideoCreateData) => this.videoDataService.createVideo(videoCreateData),
			loadVideo$: (videoId: number) => this.videoDataService.loadVideo(videoId),
			updateVideo$: (video: VideoData) => this.videoDataService.updateVideo(video),
		});
	}
	
	private keysSocket() {
		super.addSocket('keys', this.keysFactory.create());
	}
	
	private logicSocket() {
		super.logic({
			setPlayer: (transcriptPlayer: TranscriptPlayer) => of(this.transcriptService.setPlayer(transcriptPlayer)),
			showHintVideoSaving: () => of(this.redux.dispatch(new ReplaceHintAction({messageKey: 'content.transcript.edit.saving'}))),
			flashHintVideoSaved: (milliseconds?: number) => {
				this.redux.dispatch(new FlashHintAction({messageKey: 'content.transcript.edit.saved'}));
				return of(window.setTimeout(() => {
					this.redux.dispatch(new UpdateHintFromUrlAction({url: this.router.url}));
				}, milliseconds || globalHintFlashingTime));
			},
		});
	}
	
	private errorSocket() {
		super.error({
			videoCreation: (error: HttpErrorResponse) => of(error), //TODO global or other error handling
			videoLoading: (error: HttpErrorResponse) => of(error),
			videoUpdating: (error: HttpErrorResponse) => of(error)
		});
	}
	
	private routeSocket() {
		super.route({
			editVideo: (videoId: number) => defer(() => this.router.navigateByUrl('content/video/' + videoId + '/edit')),
			videoId$: () => this.router.events
				.pipe(
					filter((event) => event instanceof ActivationEnd),
					map((event: ActivationEnd) => event.snapshot.params),
					filter((params) => params.videoId !== undefined),
					map((params) => params.videoId),
				),
		});
	}
	
	private storeSocket() {
		super.store({
				prepareVideoForPlayer: (config: { domain: VideoDomain, videoId: string }) => of(this.redux.dispatch(new VideoPrepareForPlayerAction({
					domain: config.domain,
					videoId: config.videoId
				}))),
				putVideo: (video: VideoData) => of(this.redux.dispatch(new VideoPutAction({video: video}))),
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
		);
	}
}
