import {TranscriptPlayer} from "../../../../transcriptFM/transcript.player";
import {Injectable} from "@angular/core";
import {SimpleTime} from "../../../../../_utils/data/date.and.time";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class YoutubePlayer extends TranscriptPlayer {
	private timer;
	private timestep: number = 250;
	
	startPlayback(): void {
		this.player.playVideo();
	}
	
	currentTime(): SimpleTime {
		return new SimpleTime(this.player.getCurrentTime().toFixed(3) * 1000);
	}
	
	listenToTime(): BehaviorSubject<SimpleTime> {
		this.timer = setInterval(() => {
			let currentTime = this.currentTimeInMilliseconds();
			this.timeChanged.next(new SimpleTime(currentTime - (currentTime % 250)));
		}, this.timestep);
		return this.timer;
	}
	
	stopListeningToTime(): void {
		clearInterval(this.timer);
	}
	
	private currentTimeInMilliseconds() {
		return this.player.getCurrentTime().toFixed(3) * 1000;
	}
}