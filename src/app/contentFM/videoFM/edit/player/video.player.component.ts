import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {VideoData, VideoDomain} from "../../video.data";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {VideoJunctionBox} from "../../video.junction.box";

@Component({
	selector: 'tmt-video-player',
	templateUrl: './video.player.component.html',
	styleUrls: ['./video.player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
	@ViewChild('videoElement') videoElement: ElementRef;
	@Input() groups: {
		header: FormGroupConfig,
		metadata: FormGroupConfig,
		transcript: FormGroupConfig
	};
	video: VideoData;
	
	constructor(public translate: TranslateService,
	            private jBox: VideoJunctionBox) {}
	
	ngOnInit(): void {
		this.jBox.store().video$().subscribe((video) => {
			this.video = video;
		})
		this.prepareVideo();
	}
	
	private prepareVideo() {
		if (this.video.header.url.includes(VideoDomain.Youtube)) {
			this.jBox.store().prepareVideoForPlayer({
				domain: VideoDomain.Youtube,
				videoId: this.video.header.url.split('v=')[1]
			});
		}
	}
}