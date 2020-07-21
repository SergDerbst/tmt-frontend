import {Component, Input, OnInit} from "@angular/core";
import {VideoData} from "../../../video.data";

@Component({
	selector: 'tmt-youtube-player',
	templateUrl: './youtube.player.component.html',
	styleUrls: ['./youtube.player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
	@Input() video: VideoData;
	
	constructor() {
	}
	
	ngOnInit(): void {
		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		document.body.appendChild(tag);
	}
}