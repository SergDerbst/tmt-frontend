import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {VideoData, VideoDomain} from "../../video.data";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {DocumentKeyEventService} from "../../../../_utils/keyboard/document.key.event.service";
import {VideoEditKeyActions} from "../video.edit.key.actions";
import {TranslateService} from "@ngx-translate/core";

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
	domains = {
		youtube: VideoDomain.Youtube
	}
	
	constructor(public translate: TranslateService,
	            private keyEventService: DocumentKeyEventService,
	            private videoEditKeyActions: VideoEditKeyActions) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		this.prepareVideoId();
		this.prepareScript();
		this.videoEditKeyActions.prepareActions();
	}
	
	private prepareVideoId() {
		if (this.video.header.url.includes(VideoDomain.Youtube)) {
			this.video.header.domain = VideoDomain.Youtube;
			this.video.header.videoId = this.video.header.url.split('v=')[1];
		}
		return "";
	}
	
	private prepareScript() {
		let tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		document.body.appendChild(tag);
	}
}