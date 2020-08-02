import {TranscriptPlayer} from "../../../../transcript/transcript.player";
import {Injectable} from "@angular/core";

@Injectable()
export class YoutubePlayer extends TranscriptPlayer {
	
	startPlayback(): void {
		this.player.playVideo();
	}
}