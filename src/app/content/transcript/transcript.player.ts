import {TranscriptStatus} from "./transcript.status";

/**
 * Abstract base class to encapsulate the current media player for transcription
 * in order to have a consistent player API for the transcription module.
 */
export abstract class TranscriptPlayer {
	protected player: any;
	status: TranscriptStatus;
	
	setPlayer(player: any) {
		console.log('set player');
		this.player = player;
		console.log(this.player);
	}
	
	abstract startPlayback(): void;
}