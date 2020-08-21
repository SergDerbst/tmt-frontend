import {
	AuthJunction,
	DataJunction, ErrorJunction,
	Junction,
	JunctionBox,
	JunctionProvider, LogicJunction,
	RouteJunction,
	StoreJunction
} from "../../_junction/junction";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {defer, Observable, of} from "rxjs";
import {VideoCreateData, VideoData} from "./video.data";
import {selectVideoState, videoState} from "./_store/video.selectors";
import {filter, map} from "rxjs/operators";
import {VideoState} from "./_store/video.state";
import {KeysJunctionFactory} from "../../_utils/keyboard/keys.junction";
import {VideoDataService} from "./video.data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {VideoLoadedSuccessAction} from "./_store/video.actions";
import {FlashHintAction, ReplaceHintAction, UpdateHintFromUrlAction} from "../../main/header/_store/header.actions";
import {globalHintFlashingTime} from "../../main/header/_store/header.state";

export interface VideoAuthJunction extends AuthJunction {}
export interface VideoDataJunction extends DataJunction {
	createVideo$: (videoCreateData: VideoCreateData) => Observable<VideoData>;
	loadVideo$: (videoId: number) => Observable<VideoData>;
	updateVideo$: (video: VideoData) => Observable<VideoData>;
}

export interface VideoErrorJunction extends ErrorJunction {
	videoCreation: (error: HttpErrorResponse) => Observable<HttpErrorResponse>;
}

export interface VideoLogicJunction extends LogicJunction {
	showHintVideoSaving: () => Observable<void>,
	flashHintVideoSaved: (milliseconds?: number) => Observable<any>,
}

export interface VideoRouteJunction extends RouteJunction {
	editVideo: (videoId: number) => Observable<boolean>;
	params$: () => Observable<Params>;
}

export interface VideoStoreJunction extends StoreJunction {
	video$: () => Observable<VideoData>,
	videoState$: () => Observable<VideoState>,
}

@Injectable()
export class VideoJunctionBox extends JunctionBox<
	VideoAuthJunction,
	VideoDataJunction,
	VideoErrorJunction,
	VideoLogicJunction,
	VideoRouteJunction,
	VideoStoreJunction> {
	constructor(private readonly activatedRoute: ActivatedRoute,
							private readonly keysFactory: KeysJunctionFactory,
							private readonly redux: Store,
	            private readonly router: Router,
	            private readonly videoDataService: VideoDataService) {
		super();
		this.addJunction('keys', this.keysFactory.create());
		this.data({
			createVideo$: (videoCreateData: VideoCreateData) => this.videoDataService.createVideo(videoCreateData),
			loadVideo$: (videoId: number) => this.videoDataService.loadVideo(videoId),
			updateVideo$: (video: VideoData) => this.videoDataService.updateVideo(video),
		});
		this.error({
			videoCreation: (error: HttpErrorResponse) => of(error), //TODO global or other error handling, bitch
			videoLoading: (error: HttpErrorResponse) => of(error)
		});
		this.logic({
			showHintVideoSaving: () => of(this.redux.dispatch(new ReplaceHintAction({messageKey: 'content.transcript.edit.saving'}))),
			flashHintVideoSaved: (milliseconds?: number) => {
				this.redux.dispatch(new FlashHintAction({messageKey: 'content.transcript.edit.saved'}));
				return of(window.setTimeout(() => {
					this.redux.dispatch(new UpdateHintFromUrlAction({ url: this.router.url }));
				}, milliseconds || globalHintFlashingTime));
			},
		});
		this.route({
			editVideo: (videoId: number) => defer(() => this.router.navigateByUrl('content/video/' + videoId + '/edit')),
			params$: () => this.activatedRoute.params,
		});
		this.store({
			addVideo: (video: VideoData) => of(this.redux.dispatch(new VideoLoadedSuccessAction({ video: video }))),
			video$: () => this.redux.pipe(
				select(videoState),
				filter((videoState: VideoState) => videoState.video !== undefined),
				map(videoState => videoState.video),
				filter(video => video.header.domain === undefined),
			),
			videoState$: () => this.redux.pipe(
				select(selectVideoState),
				filter((videoState: VideoState) => videoState.video !== undefined),
				filter((videoState: VideoState) => videoState.video.header.domain === undefined)),
		})
	}
	
	keys: JunctionProvider<any> = (): Junction => {
		return this.junctions['keys'];
	}
}
