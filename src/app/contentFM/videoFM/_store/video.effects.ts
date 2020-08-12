import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {
	VideoActionTypes,
	VideoInitializeComponentAction,
	VideoLoadedErrorAction,
	VideoLoadedSuccessAction
} from "./video.actions";
import {map, switchMap} from "rxjs/operators";
import {VideoService} from "../video.service";

@Injectable()
export class VideoEffects {
	
	constructor(private actions$: Actions,
	            private store: Store,
	            private videoService: VideoService) {}
	
	@Effect()
	loadVideo = this.actions$.pipe(
		ofType<VideoInitializeComponentAction>(VideoActionTypes.VideoInitializeComponent),
		map(action => action.payload),
		// @ts-ignore
		switchMap((payload) => {
			this.videoService.getVideo(payload.videoId).subscribe(
			video => {
				this.store.dispatch(new VideoLoadedSuccessAction({ video: video }))
			}, error => {
				this.store.dispatch(new VideoLoadedErrorAction({ error: error }))
			});
		})
	);
}