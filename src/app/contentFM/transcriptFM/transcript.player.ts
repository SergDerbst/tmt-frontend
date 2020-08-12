/**
 * Abstract base class to encapsulate the current media player for transcription
 * in order to have a consistent player API for the transcription module.
 */
import {TranscriptStatus} from "./transcript.service";
import {SimpleTime} from "../../_utils/data/date.and.time";
import {BehaviorSubject} from "rxjs";

export abstract class TranscriptPlayer {
	protected player: any;
	status: TranscriptStatus;
	timeChanged = new BehaviorSubject<SimpleTime>(null);
	
	setPlayer(player: any) {
		this.player = player;
	}
	
	abstract startPlayback(): void;
	
	abstract currentTime(): SimpleTime
	
	abstract listenToTime(): BehaviorSubject<SimpleTime>;
	
	abstract stopListeningToTime(): void;
}