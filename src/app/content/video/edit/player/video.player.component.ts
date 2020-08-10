import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {VideoData, VideoDomain} from "../../video.data";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {YoutubePlayer} from "./youtube/youtube.player";
import {TranscriptPlayer} from "../../../transcript/transcript.player";

@Component({
	selector: 'tmt-video-player',
	templateUrl: './video.player.component.html',
	styleUrls: ['./video.player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
	@ViewChild('videoElement') videoElement: ElementRef;
	@Input() video: VideoData;
	@Input() groups: {
		header: FormGroupConfig,
		metadata: FormGroupConfig,
		transcript: FormGroupConfig
	};
	player: TranscriptPlayer;
	
	constructor(public translate: TranslateService,
	            private youtubePlayer: YoutubePlayer) {
	}
	
	ngOnInit(): void {
		this.prepareVideo();
	}
	
	private prepareVideo() {
		if (this.video.header.url.includes(VideoDomain.Youtube)) {
			this.video.header.domain = VideoDomain.Youtube;
			this.video.header.videoId = this.video.header.url.split('v=')[1];
			this.player = this.youtubePlayer;
		}
		//TODO for other video domains (a switch case maybe?)
		return "";
	}
}