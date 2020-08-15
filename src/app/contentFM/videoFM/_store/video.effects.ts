import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {
	VideoActionTypes, VideoCreateAction, VideoCreatedErrorAction, VideoCreatedSuccessAction,
	VideoInitializeEditComponentAction,
	VideoLoadedErrorAction,
	VideoLoadedSuccessAction
} from "./video.actions";
import {map, switchMap, tap} from "rxjs/operators";
import {VideoService} from "../video.service";
import {Router} from "@angular/router";
import {of} from "rxjs";

@Injectable()
export class VideoEffects {
	
	constructor(private actions$: Actions,
	            private router: Router,
	            private store: Store,
	            private videoService: VideoService) {}
	
	@Effect({dispatch: false})
  createVideo = this.actions$.pipe(
  	ofType<VideoCreateAction>(VideoActionTypes.VideoCreate),
	  map(action => action.payload),
	  tap((payload) => {
		  this.videoService.createVideo(payload).subscribe(
			  video => {
				  this.store.dispatch(new VideoCreatedSuccessAction({ video: video }));
			  },
		  error => {
			    this.store.dispatch(new VideoCreatedErrorAction({ error: error }));
		  });
	  }),
  );
	
	@Effect({dispatch: false})
	createVideoSuccess = this.actions$.pipe(
		ofType<VideoCreatedSuccessAction>(VideoActionTypes.VideoCreatedSuccess),
		map(action => action.payload.video),
		tap((video) => {
			return this.router.navigateByUrl('content/video/' + video.header.id + '/edit');
		})
	);
	 
	@Effect({dispatch: false})
	loadVideo = this.actions$.pipe(
		ofType<VideoInitializeEditComponentAction>(VideoActionTypes.VideoInitializeEditComponent),
		map(action => action.payload),
		tap((payload) => {
			this.videoService.getVideo(payload.videoId).subscribe(
			video => {
				this.store.dispatch(new VideoLoadedSuccessAction({ video: video }))
			}, error => {
				this.store.dispatch(new VideoLoadedErrorAction({ error: error }))
			});
		})
	);
}