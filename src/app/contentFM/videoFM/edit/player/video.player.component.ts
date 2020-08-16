import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {VideoData, VideoDomain} from "../../video.data";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {YoutubePlayer} from "./youtube/youtube.player";
import {TranscriptPlayer} from "../../../transcriptFM/transcript.player";
import {select, Store} from "@ngrx/store";
import {videoState} from "../../_store/video.selectors";
import {filter, map} from "rxjs/operators";
import {VideoState} from "../../_store/video.state";
import {VideoPrepareForPlayerAction} from "../../_store/video.actions";

@Component({
	selector: 'tmt-video-player',
	templateUrl: './video.player.component.html',
	styleUrls: ['./video.player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
	@ViewChild('videoElement') videoElement: ElementRef;
	video: VideoData;
	@Input() groups: {
		header: FormGroupConfig,
		metadata: FormGroupConfig,
		transcript: FormGroupConfig
	};
	player: TranscriptPlayer;
	
	constructor(public translate: TranslateService,
	            private store: Store,
	            private youtubePlayer: YoutubePlayer) {
	}
	
	ngOnInit(): void {
		this.store.pipe(
			select(videoState),
			filter((videoState: VideoState) => videoState.video !== undefined),
			map(videoState => videoState.video),
			filter(video => video.header.domain === undefined)
		).subscribe((video) => {
			this.video = video;
			this.prepareVideo();
		});
	}
	
	private prepareVideo() {
		if (this.video.header.url.includes(VideoDomain.Youtube)) {
			this.store.dispatch(new VideoPrepareForPlayerAction({
				domain: VideoDomain.Youtube,
				videoId: this.video.header.url.split('v=')[1]
			}));
			this.player = this.youtubePlayer;
		}
	}
}