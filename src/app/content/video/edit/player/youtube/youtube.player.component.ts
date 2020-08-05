import {Component, Input, OnInit} from "@angular/core";
import {VideoData} from "../../../video.data";
import {TranscriptService, TranscriptStatus} from "../../../../transcript/transcript.service";

@Component({
	selector: 'tmt-youtube-player',
	templateUrl: './youtube.player.component.html',
	styleUrls: ['./youtube.player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
	@Input() video: VideoData;
	YT: any;
	player: any;
	reframed: boolean = false;
	
	constructor(private transcriptService: TranscriptService) {}
	
	ngOnInit(): void {
		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		window['onYouTubeIframeAPIReady'] = () => {
			this.reframed = false;
			this.player = new window['YT'].Player('player', {
				videoId: this.video.header.videoId,
				width: '100%',
				playerVars: {
					autoplay: 0,
					modestbranding: 1,
					controls: 1,
					disablekb: 1,
				},
				events: {
					'onStateChange': this.onPlayerStateChange.bind(this),
					'onReady': this.onPlayerReady.bind(this),
				}
			})
		};
	}
	
	onPlayerReady(event) {
		this.transcriptService.player.setPlayer(event.target);
		this.transcriptService.updateStatus(TranscriptStatus.ReadyForTranscription);
	}
	
	onPlayerStateChange(event) {
		switch(event.data) {
			case window['YT'].PlayerState.PLAYING:
				this.transcriptService.listenToTime();
				if (this.transcriptService.status === TranscriptStatus.ReadyForTranscription) {
					this.transcriptService.updateStatus(TranscriptStatus.ReadyForSnippet);
				}
		}
	}
}